import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
  const res = await fetch('https://www.partyplace.gr/en/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const content = [];
  $('h1, h2, h3, p, li').each((i, el) => {
    content.push($(el).text().trim().replace(/\s+/g, ' '));
  });
  
  fs.writeFileSync('extracted.txt', content.filter(c => c.length > 0).join('\n'));
}

main();
