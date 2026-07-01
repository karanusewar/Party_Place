import fs from 'fs';
try {
  const res = await fetch('https://www.partyplace.gr/en/');
  const data = await res.text();
  fs.writeFileSync('output.txt', data);
  console.log("Wrote to output.txt");
} catch (e) {
  console.error(e);
}
