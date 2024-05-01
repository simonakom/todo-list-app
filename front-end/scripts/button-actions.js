const moveToDoneBtn = document.querySelector("#moveToDone");
const moveToTodoBtn = document.querySelector("#moveToTodo");
const deleteTodoBtn = document.querySelector("#deleteTodoBtn");

//variable from moveTodo.js
// const doneListElement = document.querySelector(".done-list");
// const todoListElement = document.querySelector(".all-todos");

const moveTodoToDone = () => {
    //to get all checked inputus 
    const allTodosCheckedInputs = document.querySelectorAll(".all-todos .todo input:checked");
    //to move all checked elements (not checkbox but input): each iteration takes an input
    for (const inputElement of allTodosCheckedInputs) {  //each iteration is followed by inputElement.parentElement - parent element ("todo") (can be checked in console.log by typing: "[document.querySelector('.todo')])

        // Update the button text to "Undo"
        const parent = inputElement.parentElement; //to change the text on the undo button
        const parentId = parent.attributes["todo-id"].value; //is addressed with [todo-id] because there is a "-". Attributes are an object.
        const textElement = document.querySelector(`[todomove="${parentId}"]`); //adressing to todo-id child = todo-text
        textElement.innerText = "Udone-button"; 
        textElement.onclick =  moveFromDoneToTodo; //otherwise the undo button does not work 

        inputElement.checked = false; //the moved element is un-checked.
        //move from todo list to done list
        doneListElement.append(inputElement.parentElement) //adds to the done list  the last "child" element 
    }
    // console.log(allTodosCheckedInputs);
}
moveToDoneBtn.onclick = moveTodoToDone;

const moveTodoToTodoList = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".done-list .todo input:checked"); //changing only list
    for (const inputElement of allTodosCheckedInputs) { 

        // Update the button text to "Done"
        const parent = inputElement.parentElement; //to change the text on the undo button
        const parentId = parent.attributes["todo-id"].value; //is addressed with [todo-id] because there is a "-". Attributes are an object.
        const textElement = document.querySelector(`[todomove="${parentId}"]`); //adressing to todo-id child = todo-text
        textElement.innerText = "Done-button"; 
        textElement.onclick =  moveFromTodoToDone; //otherwise the undo button does not work 

        inputElement.checked = false; 
        todoListElement.append(inputElement.parentElement) //adds to the done list  the last "child" element 
    }
}
moveToTodoBtn.onclick = moveTodoToTodoList;

const deleteTodoElement = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".todo input:checked");
    for (const inputElement of allTodosCheckedInputs) { 
        inputElement.parentElement.remove(); //delete element
    } 
}
deleteTodoBtn.onclick = deleteTodoElement;