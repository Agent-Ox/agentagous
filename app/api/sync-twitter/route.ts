import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

async function getPageMeta(url: string): Promise<{ name: string; description: string }> {
  try {
    const res = await fetch('https://' + url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const html = await res.text()
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    const name = titleMatch
      ? titleMatch[1].split('|')[0].split('-')[0].split(':')[0].trim().slice(0, 60)
      : url.replace('.polsia.app', '').replace(/-[a-z0-9]{4,}$/, '')
    const description = descMatch
      ? descMatch[1].trim().slice(0, 300)
      : 'An autonomous AI-run company on Polsia.'
    return { name, description }
  } catch {
    const name = url.replace('.polsia.app', '').replace(/-[a-z0-9]{4,}$/, '')
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      description: 'An autonomous AI-run company on Polsia.'
    }
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== 'Bearer ' + process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const searchUrl = 'https://api.twitter.com/2/tweets/search/recent?query=from%3Apolsia%20polsia.app&max_results=100&tweet.fields=created_at,text'
    const tweetRes = await fetch(searchUrl, {
      headers: { Authorization: 'Bearer ' + BEARER_TOKEN }
    })
    const tweetData = await tweetRes.json()

    if (!tweetData.data || tweetData.data.length === 0) {
      return NextResponse.json({ message: 'No new tweets found', added: 0 })
    }

    const urlRegex = /https?:\/\/([\w-]+\.polsia\.app)/g
    const foundUrls: string[] = []

    for (const tweet of tweetData.data) {
      let match
      while ((match = urlRegex.exec(tweet.text)) !== null) {
        const subdomain = match[1]
        if (!foundUrls.includes(subdomain)) {
          foundUrls.push(subdomain)
        }
        urlRegex.lastIndex = 0
      }
    }

    if (foundUrls.length === 0) {
      return NextResponse.json({ message: 'No polsia.app URLs found in tweets', added: 0 })
    }

    const { data: existing } = await supabase.from('companies').select('url')
    const existingUrls = new Set((existing || []).map((c: { url: string }) => c.url))
    const newUrls = foundUrls.filter(u => !existingUrls.has(u))

    if (newUrls.length === 0) {
      return NextResponse.json({ message: 'All companies already in database', added: 0 })
    }

    let added = 0
    for (const url of newUrls) {
      const { name, description } = await getPageMeta(url)
      if (name === 'Service Suspended') continue

      const { error } = await supabase.from('companies').insert({
        name,
        description,
        url,
        category: 'Other',
        source: 'x_polsia',
        featured: false
      })

      if (!error) added++
      await new Promise(r => setTimeout(r, 500))
    }

    return NextResponse.json({
      message: 'Sync complete',
      tweetsProcessed: tweetData.data.length,
      urlsFound: foundUrls.length,
      newUrlsAdded: added
    })

  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
