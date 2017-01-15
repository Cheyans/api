#!/usr/bin/env node

import {logger} from "./src/libs/logger";
setupDevEnvIfNecessary();

/**
 * Module dependencies.
 */
import {App} from "./src/app";
import {createServer} from "http";

const app = new App().express;

/**
 * Get port from environment and store in Express.
 */
const port = parseInt(process.env.PORT, 10);
app.set("port", port);
const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  logger.info("Listening on " + bind);
}

/**
 * Runs through necessary dev env setup, this should always be called before the App is imported
 */
function setupDevEnvIfNecessary() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // Load in .env files if not in docker
  if (process.argv.find((v) => v === "--no-docker")) {
    // tslint:disable-next-line:no-var-requires
    logger.info(`Loaded env vars: ${JSON.stringify(require("dotenv").config())}`);
  }

  // Catch and log UnhandledPromiseRejectionWarning
  process.on("unhandledRejection", (e: any) => logger.error(e));
}
