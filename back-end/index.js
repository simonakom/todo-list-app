const express = require("express");
const usersController = require("./controllers/usersController");
const todosController = require("./controllers/todosController");
const initialize = require("./middlewares/init");

const server = express();

initialize(server);

server.use("/users", usersController);
server.use("/todos", todosController);

// --------------------Run Server------------------------------//

server.listen(3000, () => {
	console.log("Server is running: http://localhost:3000/");
});