// all users endpoints 
const express = require("express");
const data = require("../data.json");
const router = express.Router();
const { writeFile } = require("../utils/fileOperations");

//-------------------------------------POST (new user register)----------------------------------------------------------------------------------------------//
router.post("/register", async (req, res) => {
	// console.log(req.body);
	try {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;
		data.users.push({
			id: data.userId,
			username: username,
			email: email,
			password: password,
		});
		data.userId++;
		await writeFile(data);
		req.session.loggedIn = true;
		req.session.username = username;
		req.session.userId = data.users[data.users.length - 1].id;
		res.send("Succesfull registration!");
	} catch (err) {
		console.error(err);
		res.send("Invalid data");
	}
});

//-------------------------------------GET (get all users in database)------------------------------------------------------------------------------------------//
router.get("/", (req, res) => {
	res.send(data.users);
});

//------------------------------------GET (Get specific user data by id)--------------------------------------------------------------------------------------//
router.get("/:id", (req, res) => {
	console.log(isNaN(+req.params.id));
	if (isNaN(+req.params.id)) {
		return res.send("ID should be a number");
	}

	const selectedUser = data.users.find((user) => user.id === +req.params.id);
	if (!selectedUser) {
		return res.send("User not found"); 
	} else {
		return res.send(selectedUser);
	}
});

//-------------------------------------POST (Existing user login endpoint)---------------------------------------------------------------------------------------//
router.post("/login", (req, res) => {
	const username = req.body.username, 
		password = req.body.password; 

	if (!username)
		return res.status(400).json({ message:"Enter correct username" });
	if (!password)
		return res.status(400).json({ message: "Enter correct password" });
	const selectedUser = data.users.find((user) => user.username.toLowerCase() === username.toLowerCase()); 
	if (!selectedUser)
		return res.status(404).json({ message: "Toks vartotojas neegzistuoja" });

	if (selectedUser.password === password) {
		req.session.loggedIn = true;
		req.session.username = selectedUser.username;
		req.session.userId = selectedUser.id;
		res.status(200).json({ url: "http://localhost/todos.html" });
	}
});

//------------------------------------------Session check EndPoint----------------------------------------------------------------------------------------------//
router.get("/session-check", (req, res) => {
	if (req.session.loggedIn)
		return res.status(200).json({ message: "Valid session", sessionValid: true });
	else {
		return res.status(400).json({ message: "Invalid session", sessionValid: false });
	}
});


module.exports = router;
