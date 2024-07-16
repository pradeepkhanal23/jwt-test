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

//we might get the cors error, for which we might need this code later when our frontend is hosted in a separate domain in the future

// cookie-parser error, we use middleware
// app.use(cookieParser)

// app.use((req, res, next) => {
//   // Set CORS headers
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

//   // Pass to next layer of middleware
//   next();
// });
