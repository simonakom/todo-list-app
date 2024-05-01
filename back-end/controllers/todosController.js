// all todos endpoints 
const express = require("express");
const data = require("../data.json");
const router = express.Router();
const { writeFile } = require("../utils/fileOperations");

//-------------------------------------POST (add new todo)----------------------------------------------------------------------------------------------------------------------//
router.post("/", (req, res) => {
    const { todo, done } = req.body;
	const username = req.session.username;
	if (!username) return res.status(400).json({ message:  "Wrong Username" });
	if (!todo) return res.status(400).json({ message: "Wrong to-do" });

    const selectedUser = data.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
    const newTodo = { id: data.todosId, username, todo, done: !!done };
	data.todos.push(newTodo);
	data.todosId++;
	writeFile(data);
    res.status(201).json({ message: "Naujas todo buvo sėkmingai pridėtas", newTodo });
});

//------------------------------------GET (get all todos)------------------------------------------------------------------------------------------------------------------------// 
router.get("/", (req, res) => {
	res.status(200).json(data.todos);
});
//------------------------------------GET (Get specific todo by id)--------------------------------------------------------------------------------------------------------------//
router.get("/:id", (req, res) => {
	const id = +req.params.id;
	if (isNaN(id))
		return res.status(400).json({ message: "Enter valid ID. Entered ID do not exist" });
	const existingTodo = data.todos.find((todo) => todo.id === id);
	if (!existingTodo) res.status(404).json({ message: "not found" });
	else res.status(200).json(existingTodo); 
});
//------------------------------------PUT (update todo)----------------------------------------------------------------------------------------------------------------------------//
router.put("/:id", (req, res) => {
	const id = +req.params.id;
	if (isNaN(id))
		return res.status(400).json({ message: "Enter valid ID. Entered ID do not exist" });
	const { todo, done } = req.body;
	const username = req.session.username;

	const existingUser = data.users.find((user) => user.username.toLowerCase() === username.toLowerCase());

	if (!existingUser)return res.status(404).json({ message: "User not found" });

	const existingTodo = data.todos.findIndex((currentTodo) => currentTodo.id === id);
	data.todos[existingTodo] = {...data.todos[existingTodo],todo: todo || data.todos[existingTodo].todo,done,};
	writeFile(data);

	if (!existingTodo)res.status(404).json({ message:  "To-do not found" });
	else res.status(201).json(data.todos[existingTodo]);
});

//--------------------------------------DELETE (delete todo by id)-------------------------------------------------------------------------------------------------------------------------------//
router.delete("/:id", (req, res) => {
	const id = +req.params.id;
	if (isNaN(id))
		return res.status(400).json({ message: "Enter valid ID. Entered ID do not exist" });
	const existingTodoIndex = data.todos.findIndex((currentTodo) => currentTodo.id === id);
	if (existingTodoIndex === -1) {
		return res.status(404).json({ message: "not found" });
	} else {
		data.todos.splice(existingTodoIndex, 1);
		writeFile(data);
		return res.status(200).json({ message: "Deleted succsefully!" });
	}
});

module.exports = router;
