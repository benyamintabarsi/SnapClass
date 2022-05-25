// Get dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const config = require("./server/routes/config");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const cors = require("cors");

// Use cors
app.use(cors({origin: config.server.host}))

/**
 * Add routes to server
 */
const routes = require("./server/routes/routes");
app.use("/", routes);

/**
 * Point static path to dist
 */
app.use(express.static(path.join(__dirname, "dist/snapclass-ui")));
app.use(express.static(path.join(__dirname, "Snap-4.2.2.9")));
app.use(express.static(path.join(__dirname, "cellular")));
app.use(express.static(path.join(__dirname, "config")));

/**
 * Body Parser Middleware
 * Passport Middleware
 */
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(passport.initialize());
app.use(passport.session());
require("./server/routes/users/user-passport")(passport);

/**
 * Catch all other routes and return the index file
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/snapclass-ui/index.html"));
});

/**
 * Get port from environment and store in Express.
 */
app.set("port", config.server.port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.server.port, () =>
  console.log(`API running on localhost:${config.server.port}`)
);

function stop() {
  server.close();
}
module.exports.stop = stop;
