#!/usr/bin/env node
// Submit all sitemap URLs to IndexNow (Bing/Yandex/etc.)
// Usage:
//   node indexnow-submit.mjs                 # submit every URL in the sitemap
//   node indexnow-submit.mjs <url> [<url>]   # submit specific URL(s)

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST = 'cuongthonggio.com';
const KEY = '94124064550548d1a25bc9f236eb9df1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function urlsFromSitemap() {
  const xml = await readFile(join(__dirname, 'public', 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
  // <loc> appears inside both <url> and <image:image>; keep only page URLs on our host.
  return [...new Set(locs)].filter(
    (u) => u.startsWith(`https://${HOST}`) && !/\.(webp|png|jpe?g|svg)$/i.test(u)
  );
}

async function main() {
  const cliUrls = process.argv.slice(2);
  const urlList = cliUrls.length ? cliUrls : await urlsFromSitemap();

  if (!urlList.length) {
    console.error('No URLs to submit.');
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
  urlList.forEach((u) => console.log('  ' + u));

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  const body = await res.text();
  console.log(`\nIndexNow responded: ${res.status} ${res.statusText}`);
  if (body.trim()) console.log(body);

  if (res.status === 200 || res.status === 202) {
    console.log('Done — URLs accepted.');
  } else {
    console.error('Submission was not accepted. See status above.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
