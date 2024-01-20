const express = require("express");
const cors = require("cors");
const http = require("http");
const config = require("config");
const { Server } = require("socket.io");

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

// Handle socket connections
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});
require("./socket")(io);

// Create an endpoint to receive POST requests with JSON payload
require("./modules/message")(app, io);

// Send error if API not found
app.use((req, res, next) => {
	res.status(404).send({ errors: `Page or API not found` });
});

const PORT = process.env.PORT || config.get("port") || 4000;
server.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
