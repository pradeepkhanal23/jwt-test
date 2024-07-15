const express = require("express");
require("dotenv").config();
// Importing the connection logic
const db = require("./config/connection");

const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
// Built-in Express function that parses incoming requests to JSON
app.use(express.json());

const PORT = process.env.PORT || 2000;

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is listening in ${PORT}`);
    console.log("Database connection is open..");
  });
});
