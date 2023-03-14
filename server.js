const app = require("./app");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { default: mongoose } = require("mongoose");

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log("Database connection successful".red.bold);
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`.yellow.bold);
});
