require("dotenv").config();
const createHttpError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const Validator = require("./middleware/Validator");
// Import routes
const authRouter = require("./routes/auth");
const searchRouter = require("./routes/search");
const keyRouter = require("./routes/key");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3008;

const http = require("http").createServer(app);

app.use(express.static(__dirname, { dotfiles: "allow" }));
app.use(express.json({ extended: true }));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: true, credentials: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//* Bind Routes
app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/key", keyRouter);

//* Catch HTTP 404
app.use((req, res, next) => {
  next();
});

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log("error", err);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// app.get();

http.listen(8080, () => {
  console.log("running on port 8080");
});
