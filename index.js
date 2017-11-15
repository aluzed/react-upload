/**
* Doc : https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
*/
const express = require('express');
const path = require('path');
const app = express();
const port    =   process.env.PORT || 8080;

app.use('/views', express.static('public'));

app.get('/views*', (req, res) => {
// app.get(/^\//, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
