const path = require('path');
// __dirname is server folder in this context
const publicPath = path.join(__dirname,"../public");
const express = require('express');
const app = express();

const port = process.env || 3000; // set up for Heroku
//console.log(__dirname + '/../public');  // old way to get public folder

app.use(express.static(publicPath)); // serve static files


app.listen(port, () => console.log(`Server listening on port ${port}!`));