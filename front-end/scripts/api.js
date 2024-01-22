//------------------------------------------------------session check--------------------------------------------------------------------------------------------------//
async function sessionCheck() {
	try {
		const promise = await fetch("http://localhost/server/users/session-check", {
			credentials: "include",
		});
		const answer = await promise.json();
		if (!answer.sessionValid) {
			window.location.href = "http://localhost/";
		}
	} catch (err) {
		console.log(err);
	}
}

//------------------------------------------------------Functions for server ------------------------------------------------------------------------//
async function postNewTodo(todo) {
	try {
		const promise = await fetch("http://localhost/server/todos", {
			method: "post",

			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		const result = await promise.json();
		return result;
	} catch (error) {}
}

async function getAllTodos() {
	try {
		const promise = await fetch("http://localhost/server/todos");
		const result = await promise.json();
		console.log(result);
		showAllTodos(result.filter((todo) => !todo.done));
		showAllDones(result.filter((todo) => todo.done)); 
		return result;
	} catch (error) {}
}

async function updateTodoApi(todo) {
	console.log("Accessing");
	const promise = await fetch(`http://localhost/server/todos/${todo.id}`, {
		method: "put",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todo),
	});
	const result = await promise.json();
	if (!promise.ok) {
		console.error("answer from endpoint /todos /45, unsuccessful");
	} else {
		return result;
	}
}

async function deleteTodo(id) {
	console.log(`http://localhost/server/todos/${id}`);
	const promise = await fetch(`http://localhost/server/todos/${id}`, {
		method: "DELETE",
	});
	const response = await promise.json();

	if (!promise.ok) {
		console.error("Nepavyko istrinti todo iraso");
	} else {
		return response;
	}
}

sessionCheck();