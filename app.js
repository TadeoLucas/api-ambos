const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const timeout = require("./setTimeOut");

process.on("unhandledRejection", (error, req, res, next) => {
  console.log("process.on_unhandledRejection:::::", error);
  next(error);
});

process.on("uncaughtException", (error, req, res, next) => {
  console.log("process.on_uncaughtException:::::", error);
  next(error);
});

const routes = require("./routes");

const app = express();

app.use(timeout());
app.use(cors());
app.use(morgan("prod"));
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const allowedHost =
  process.env.NODE_ENV === "DEV"
    ? process.env.LOCAL_HOST
    : process.env.PROD_HOST;
const allowedHost2 =
  process.env.NODE_ENV === "DEV" ? process.env.LOCAL_HOST : process.env.PR_HOST;
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedHost);
  // res.header('Access-Control-Allow-Origin', allowedHost);
  // res.header('Access-Control-Allow-Origin', allowedHost2);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", routes);

app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

module.exports = app;
