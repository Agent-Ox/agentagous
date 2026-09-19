#!/usr/bin/env node
/**
 * IndexNow ping.
 *
 * Submits the URLs whose source actually changed, rather than the whole
 * sitemap: IndexNow is a "this changed" signal, and sending all forty pages on
 * every deploy is the same lie the build-time sitemap lastmod was telling.
 *
 * Run it AFTER the deploy is live — the endpoint fetches the key file and may
 * re-crawl immediately, so the new content has to be there first.
 *
 *   node scripts/indexnow.mjs             # changes in the last commit
 *   node scripts/indexnow.mjs HEAD~3      # changes since a given ref
 *   node scripts/indexnow.mjs --all       # every URL in the sitemap
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const HOST = 'www.wtfagents.com';
const SITE = `https://${HOST}`;
const ROOT = process.cwd();

const keyFile = readdirSync(path.join(ROOT, 'public')).find(f => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('No IndexNow key file in public/. Expected <32-hex>.txt');
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, '');

const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

/** slug -> url, read from the front matter so filenames need not match slugs. */
function slugOf(file) {
  const m = readFileSync(path.join(ROOT, file), 'utf8').match(/^slug:\s*'([^']+)'/m);
  return m ? m[1] : null;
}

function changedUrls(since) {
  const files = git('diff', '--name-only', since, 'HEAD').split('\n').filter(Boolean);
  const urls = new Set();

  for (const f of files) {
    if (f.startsWith('guides/content/') && f.endsWith('.md')) {
      // A deleted guide has no slug to read and no URL to submit.
      let slug = null;
      try { slug = slugOf(f); } catch { slug = null; }
      if (slug) { urls.add(`${SITE}/guides/${slug}`); urls.add(`${SITE}/`); }
    }
    if (f === 'lib/companies.ts') urls.add(`${SITE}/companies`);
    if (f === 'lib/tools.ts') urls.add(`${SITE}/tools`);
    if (f === 'app/page.tsx' || f === 'lib/guides.generated.ts') urls.add(`${SITE}/`);
  }
  return [...urls];
}

async function allUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

const arg = process.argv[2];
const urlList = arg === '--all' ? await allUrls() : changedUrls(arg || 'HEAD~1');

if (!urlList.length) {
  console.log('IndexNow: nothing changed, nothing submitted.');
  process.exit(0);
}

// The endpoint fetches https://<host>/<key>.txt to verify ownership. If that
// 404s the submission is rejected, so fail loudly rather than reporting a
// success the search engine did not accept.
const probe = await fetch(`${SITE}/${key}.txt`);
if (!probe.ok) {
  console.error(`IndexNow: key file ${SITE}/${key}.txt is not live (${probe.status}). Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
});

// 200 and 202 both mean accepted; 202 means the key is still being verified.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
for (const u of urlList) console.log('  ' + u);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
