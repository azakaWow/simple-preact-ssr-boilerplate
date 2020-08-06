import express from "express";
import ssr from "./ssr";
import path from "path";
import compression from "compression";
import assetManifest from '../dist/manifest.json';

const port = 5555;
const app = express();

const root = process.cwd();
const distPath = path.resolve(root, "dist")


app.use(compression());
app.use(express.static(distPath));

app.get('*', (req, res) => {
  const renderedApp = ssr({ url: req.url })
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="${assetManifest['main.css']}">
        <link rel="shortcut icon" href="https://preactjs.com/favicon.ico">
        <title>Preact ssr boilerplate</title>
      </head>
      <body>
        <div id="root">${renderedApp}</div>
      </body>
      <script async type="text/javascript" src="${assetManifest['main.js']}" ></script>
    </html>
    `;
  res.send(html);
  res.end()
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`SSR Running on port ${port}`);
});