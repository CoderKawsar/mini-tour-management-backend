const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const tourRoute = require("./routers/tourRouter");

app.use("/api/v1/tours/", tourRoute);

app.get("/", (req, res) => {
  res.send("It's live!");
});

module.exports = app;
