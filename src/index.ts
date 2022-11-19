import express from "express";
import router from "./router";
import config from "./config";

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Port Host
const PORT: number = config.port;

// route
app.use("/", router);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

const server = app
  .listen(PORT, () => {
    console.log(
      `
    ##############################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ##############################################
  `
    );
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

server.timeout = 1000000;
