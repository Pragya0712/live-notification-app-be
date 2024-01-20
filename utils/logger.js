const { format, createLogger, transports, addColors } = require("winston");
const { timestamp, label, prettyPrint } = format;
const config = require("config");

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
};
addColors(colors);

// Setting level according to environment
const level = () => {
	const env = config.get("env") || "dev";
	return env === "dev" ? "debug" : "warn";
};

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

// Creating winston format
const winstonFormat = format.combine(
	label({ label: "messages-logs" }),
	timestamp({
		format: "MMM-DD-YYYY HH:mm:ss",
	}),
	prettyPrint()
);

// Creating file for the payload logs
const messageLogs = new transports.File({
	filename: `logs/message-logs`,
});

// Logging in console
const consoleTransport = new transports.Console();

const logger = createLogger({
	level: level(),
	levels,
	format: winstonFormat,
	transports: [messageLogs, consoleTransport],
});

module.exports = {
	logger,
};
