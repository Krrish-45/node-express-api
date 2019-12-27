const bunyan = require("bunyan");
// const BunyanSlack = require("bunyan-slack");
const path = require("path");
const name = require("../../package.json").name;
const { LOGGER_CONFIG, SLACK_CONFIG, SERVER_CONFIG } = require("../config");

// Make sure you have access to write to this path
const logPath = LOGGER_CONFIG.path || "./logs";

// For available levels, checkout https://github.com/trentm/node-bunyan#levels
const logLevel = LOGGER_CONFIG.level || "info";

const streams =
  SERVER_CONFIG.env === "DEV"
    ? [
        {
          level: "debug",
          stream: process.stdout

          // type: 'raw',
          // stream: require('bunyan-debug-stream')({
          //   basepath: __dirname, // this should be the root folder of your project.
          //   forceColor: true
          // })

          // stream: new PrettyStream().pipe(process.stdout)
        }
      ]
    : [
        {
          level: logLevel,
          type: "rotating-file",
          period: "1d",
          count: 30,
          path: path.join(logPath, `${name}.log`)
        }
      ];

// if (process.env.NODE_ENV === "production")
// streams.push({
//   level: 'fatal',
//   stream: new BunyanSlack({
//     webhook_url: SLACK_CONFIG.logs.webhookUrl,
//     channel: '#' + SLACK_CONFIG.logs.channel,
//     username: SLACK_CONFIG.logs.username,
//   }),
// });

const log = bunyan.createLogger({
  name,
  streams,
  serializers: bunyan.stdSerializers
});

module.exports = log;
