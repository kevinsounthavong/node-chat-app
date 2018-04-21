const path = require('path');
// __dirname is server folder in this context
const publicPath = path.join(__dirname, "../public");
const express = require('express');
const port = process.env.PORT || 3000; // set up for Heroku
const app = express();

//console.log(__dirname + '/../public');  // old way to get public folder

app.use(express.static(publicPath)); // serve static files


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});