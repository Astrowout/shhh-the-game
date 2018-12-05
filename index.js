const https = require('https'),
      fs = require('fs'),
      express = require('express'),
      app = express(),
      port = process.env.PORT || 8080;

let options = {};

const serverCallback = () => console.log(`App listening on port ${port}!`);

if (process.env.NODE_ENV === 'development') {
  options = {
    key: fs.readFileSync('./config/sslcerts/key.pem'),
    cert: fs.readFileSync('./config/sslcerts/cert.pem')
  };
  https.createServer(options, app).listen(port, serverCallback);
} else {
  app.listen(port, serverCallback);
}

app.use(`/`, express.static(`public`));