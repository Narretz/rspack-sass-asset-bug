const express = require('express');
const app = express();
const PORT = 8085;
const { join, resolve } = require('path');


console.log('is rspack', process.env.RSPACK);

const distFolder = [process.env.RSPACK ? 'rspack-dist' : 'webpack-dist'];

app.use(express.static(join(__dirname, ...distFolder)));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
  const { url } = request;

  if (
    url.endsWith('.css') ||
    url.endsWith('.js') ||
    url.endsWith('.otf') ||
    url.endsWith('.png') ||
    url.endsWith('.svg') ||
    url.endsWith('.woff') ||
    url.endsWith('.woff2')
  ) {
    // return 404 for files that don't exist
    response.sendStatus(404);
  } else {
    // handle every other route with index.html
    response.sendFile(resolve(__dirname, ...distFolder, 'index.html'));
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
