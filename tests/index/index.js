const express = require("express");
const createServer = require('../server/server');

const app = createServer();

app.listen(5001, () => {
  console.log("Server has started!");
});

