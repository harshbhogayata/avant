const https = require('https');
https.get('https://www.pexels.com/search/videos/fashion/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https:\/\/[^\s"'><]*?\.mp4[^\s"'><]*/g);
    if(matches && matches.length > 0) {
      console.log('Found:', matches[0]);
    } else {
      console.log('No mp4 found.');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
