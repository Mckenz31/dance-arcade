const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*"),
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS");
  next();
})

app.use((req, res, next) => {
  res.send("Testing - it should appear on your browser");
  next();
})

app.get('/steps', (req, res, next) => {
  post = [
    {one:true, two:false, three:false, four:false},
    {one:false, two:true, three:false, four:false},
    {one:false, two:false, three:true, four:false}
  ];
  res.json(post);
})

module.exports = app;



