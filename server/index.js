const express = require('express')
const app = express()
const port = 3000
const { getAllFiles, getDirectories } = require('./helpers');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/paths', (req, res) => {
  if (!req.query.path) return;
  currentDir = req.query.path;
  ignoreDirs = req.query.ignore;
  if (typeof ignoreDirs === 'string') ignoreDirs = [ignoreDirs]

  const result = getAllFiles(currentDir, '.json', null, null, null, ignoreDirs);
  console.log(result);

  res.send(result);
});

app.get('/subdirectories', (req, res) => {
  if (!req.query.path) return
  currentDir = req.query.path;
  const result = getDirectories(currentDir);
  res.send(result);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
