const dotenv = require('dotenv');
dotenv.config();

const app =
  process.env.NODE_ENV == 'production'
    ? require('./serverProduction')
    : require('./serverDevelopment');
const PORT = process.env.PORT;

const setupSSL = require('./setupSSL');
// const SSL = setupSSL();
const SSL = false;

if (SSL) {
  const https = require('https');
  https.createServer(SSL, app).listen(PORT, () => {
    console.info('🌎  Server is listening on port %s.', PORT);
  });
} else {
  app.listen(PORT, error => {
    if (error)
      console.log(error);
    else
      console.info('🌎  Server is listening on port %s.', PORT);
  });
}
