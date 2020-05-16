const express = require('express')
const app = express()
const port = 3000
const { getAllFiles } = require('./helpers');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/paths', (req, res) => {
  let currentDir = __dirname.split('/');
  currentDir.pop();
  currentDir.push('src');

  if (!req.query.path) currentDir = currentDir.join('/');
  else currentDir = req.query.path;

  const result = getAllFiles(currentDir, '.json');
  res.send(result);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
