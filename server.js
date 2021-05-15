const express = require('express');
const app = express();


// Run the app by serving the static files
// in the dist directory
app.use(express.static('./dist/questionnaire-poc'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/questionnaire-poc/'}) // load our index.html file
});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);