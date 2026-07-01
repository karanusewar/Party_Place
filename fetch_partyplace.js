const https = require('https');

https.get('https://www.partyplace.gr/en/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      let url = match[1];
      if (url.startsWith('/')) {
        url = 'https://www.partyplace.gr' + url;
      }
      images.add(url);
    }
    console.log("IMAGES:");
    console.log(Array.from(images).join('\n'));
    
    // Also extract some text
    const textRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    const texts = new Set();
    while ((match = textRegex.exec(data)) !== null) {
      texts.add(match[1].replace(/<[^>]+>/g, '').trim());
    }
    console.log("\nTEXTS:");
    console.log(Array.from(texts).filter(t => t.length > 20).join('\n---\n'));
  });
}).on('error', (err) => {
  console.error(err);
});
