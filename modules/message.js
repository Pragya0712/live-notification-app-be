const { logger } = require("../utils/logger");

module.exports = (app, io) => {
	let router = require("express").Router();
	const { body, validationResult } = require("express-validator");

	router.post(
		"/",
		[
			body("username", "Username is missing").notEmpty(),
			body("message", "Message is missing").notEmpty(),
		],
		(req, res) => {
			try {
				// Sending error if req.body is empty
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				const messageData = req.body;

				// Logging the received payload
				logger.info(messageData);

				// Broadcasting the message to all connected clients
				io.emit("message", messageData);

				res.status(200).send("Message received successfully");
			} catch (error) {
				res.status(error.status).send({ errors: error.data });
			}
		}
	);

	app.use("/message", router);
};
