//the check occurs in the todos.html file which is connected to the api script.
//session check: so that users can see the to-do page only when they are logged in. And if they are not logged in, they can see the register page
async function sessionCheck(){ 
    try {
        const promise = await fetch ("http://localhost/server/user/session-check", {credentials: "include"}); 
        const answer = await promise.json();
        if (!answer.sessionValid) { //redirect user to singIN page
            window.location.href = "http://localhost/index.html" 
            // window.location.href = "http://localhost/january/2024-01-19/front-end/"
        }
    } catch(err){ 
        console.log(err);
    }
}
sessionCheck();
 
//a function that adds a new to-do when the "add" button is pressed
async function postNewTodo (todo) { //accepts the to-do object itself which is sent with fetch
    try {
        const promise = await fetch ("http://localhost/server/todos", {  //a request is sent to the server 
          //new to-do addition 
            method: "POST", 
            credentials: "include", 
            headers: {   
                "Content-Type": "application/json" //specifies the type of data that is sent to the server
             },
            body: JSON.stringify(todo)  //specifies the data to be transmitted to the server. Cant use object -  only string format data
        });
        const result = await promise.json(); //fetch result
        // console.log(result); 

        return result;
    } catch (error) {}
}

//used "todoDialogActions.js"

//function that will get all todo (so that they are still there after refrsh) (used in todoDialogActions.js function showAlltodos)
async function getAllTodos() {
    try {
        const promise = await fetch ("http://localhost/server/todos") //no settings are needed because we use GET here and it is by default
        const result = await promise.json();
        console.log(result);
        showAllTodos(result.filter((todo) => !todo.done)); //todo.done === false ->to be added to the to-do table
        showAllDones (result.filter((todo) => todo.done)); //todo.done === true ->to be added to the done table
        return result; //array
    } catch (error) {
             }
}

//to-do update function
async function updateTodo (todo){
    const promise = await fetch (`http://localhost/server/todos/${todo.id}`, {
        credentials: "include", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo) 
    }); 
    const result = await promise.json();
    if (!promise.ok){ //if the answer is unsuccessful
        console.error ("Atsakymas is endpoint /todos/45 buvo nesekmingas");
    }
    else {
        return result;
    }
}
//function used in "todoDialogactions"