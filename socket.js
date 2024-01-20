module.exports = (io) => {
	io.on("connection", (socket) => {
		console.log(`User connected ${socket.id}`);

		// Handling disconnection
		socket.on("disconnect", () => {
			console.log("User disconnected");
		});

		// Handling custom events
		socket.on("message", (data) => {
			console.log("Message received:", data);
			io.emit("message", data);
		});
	});
};
