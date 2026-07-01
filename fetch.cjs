const https = require('https');

https.get('https://www.partyplace.gr/en/', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const text = data.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    console.log(text.substring(0, 3000));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
