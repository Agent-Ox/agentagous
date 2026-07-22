#!/usr/bin/env node

/**
 * Build Agent SaaS Founder Contact List
 * Sources: GitHub (LangGraph/CrewAI stars), Product Hunt, HN, Twitter
 * Output: ~/Desktop/agent-saas-founder-list.csv
 *
 * Usage: node build-founder-list.js [--source github|ph|hn|twitter|all]
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const OUTPUT_DIR = `${process.env.HOME}/Desktop`;
const OUTPUT_FILE = `${OUTPUT_DIR}/agent-saas-founder-list.csv`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

// Contact list storage
let contacts = [];

// CSV headers
const CSV_HEADERS = [
  'name',
  'email',
  'company',
  'github_username',
  'source',
  'pain_signal',
  'confidence',
  'url',
  'date_added',
];

/**
 * Fetch GitHub stargazers for agent framework repos
 * Highest intent: directly using LangGraph/CrewAI
 */
async function fetchGitHubStargazers() {
  console.log('\n📦 Fetching GitHub stargazers...\n');

  const repos = [
    { name: 'langgraph', owner: 'langchain-ai', limit: 100 },
    { name: 'crewai', owner: 'joaomdmoura', limit: 100 },
  ];

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  for (const repo of repos) {
    console.log(`  Scanning ${repo.owner}/${repo.name}...`);

    try {
      const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/stargazers?per_page=100`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.warn(`    ⚠️  GitHub API error: ${response.status}`);
        continue;
      }

      const stargazers = await response.json();

      for (const stargazer of stargazers) {
        // Fetch user profile to get email + company
        const userUrl = `https://api.github.com/users/${stargazer.login}`;
        const userResponse = await fetch(userUrl, { headers });

        if (!userResponse.ok) continue;

        const user = await userResponse.json();

        // Build contact object
        const contact = {
          name: user.name || stargazer.login,
          email: user.email || null,
          company: user.company || 'Unknown',
          github_username: stargazer.login,
          source: `GitHub:${repo.name}`,
          pain_signal: 'using-agent-framework',
          confidence: 0.85,
          url: user.html_url,
          date_added: new Date().toISOString(),
        };

        // Only add if we have name + some contact info
        if (contact.name && (contact.email || contact.github_username)) {
          contacts.push(contact);
          console.log(`    ✓ ${contact.name} (${contact.github_username})`);
        }
      }

      // GitHub API rate limit: wait 1s between repos
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`    ❌ Error: ${error.message}`);
    }
  }

  console.log(`  Found: ${contacts.length} contacts from GitHub`);
}

/**
 * Placeholder: Product Hunt scraping
 * Requires manual web scraping or PH API
 */
async function fetchProductHunt() {
  console.log('\n📱 Product Hunt (placeholder)...');
  console.log('  Note: Requires PH API token or web scraping. Skipping for now.');
  console.log('  To implement: Use Playwright to scrape PH AI launches, extract emails from "Visit website"');
}

/**
 * Placeholder: Hacker News scraping
 */
async function fetchHackerNews() {
  console.log('\n📰 Hacker News (placeholder)...');
  console.log('  Note: Requires HN API + HTML parsing. Skipping for now.');
  console.log('  To implement: HN API → search for "agent framework" posts → extract comment authors');
}

/**
 * Placeholder: Twitter search
 */
async function fetchTwitter() {
  console.log('\n🐦 Twitter/X (placeholder)...');
  console.log('  Note: Requires Twitter API v2 Bearer token. Placeholder only.');
  console.log('  To implement: Search tweets "building with LangGraph" → extract author profiles');
}

/**
 * Write contacts to CSV
 */
function writeCSV() {
  console.log(`\n💾 Writing ${contacts.length} contacts to CSV...\n`);

  const csv = [
    CSV_HEADERS.join(','),
    ...contacts.map((c) =>
      CSV_HEADERS.map((field) => {
        const value = c[field] || '';
        // Escape quotes in CSV
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    ),
  ].join('\n');

  fs.writeFileSync(OUTPUT_FILE, csv);
  console.log(`✅ Contacts written to: ${OUTPUT_FILE}`);
  console.log(`   Total: ${contacts.length}`);
  console.log(`   Contacts with email: ${contacts.filter((c) => c.email).length}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Agent SaaS Founder Contact List Builder\n');
  console.log(`Output: ${OUTPUT_FILE}\n`);

  const source = process.argv[2]?.replace('--source=', '') || 'all';

  console.log(`Sources: ${source}\n`);

  if (source === 'all' || source === 'github') {
    await fetchGitHubStargazers();
  }

  if (source === 'all' || source === 'ph') {
    await fetchProductHunt();
  }

  if (source === 'all' || source === 'hn') {
    await fetchHackerNews();
  }

  if (source === 'all' || source === 'twitter') {
    await fetchTwitter();
  }

  if (contacts.length > 0) {
    writeCSV();
  } else {
    console.log('⚠️  No contacts found.');
  }

  console.log('\n📋 Next steps:');
  console.log('1. Enrich emails via Hunter.io (verification)');
  console.log('2. Segment by confidence + pain signal');
  console.log('3. Outreach: "Hi [NAME], I noticed you are using LangGraph. Quick Q about support..."');
  console.log('4. Track replies -> discovery interview scheduling');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
