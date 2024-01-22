const moveToDoneBtn = document.querySelector("#moveToDone");
const moveToTodoBtn = document.querySelector("#moveToTodo");
const deleteTodoBtn = document.querySelector("#deleteTodoBtn");

const moveTodoToDone = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".all-todos .todo input:checked");
    for (const inputElement of allTodosCheckedInputs) {  
        const parent = inputElement.parentElement;
        const parentId = parent.attributes["todo-id"].value; 
        document.querySelector(`[todomove="${parentId}"]`).innerText = "Back to Todo"; 
        inputElement.checked = false; 

        doneListElement.append(inputElement.parentElement) 
        updateTodoApi({
            id:  parentId,
            done: true,
        })
    }
}

const moveTodoToTodoList = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".done-list .todo input:checked");
    for (const inputElement of allTodosCheckedInputs) { 
        const parent = inputElement.parentElement; 
        const parentId = parent.attributes["todo-id"].value; 
        document.querySelector(`[todomove="${parentId}"]`).innerText = "Done"; 

        inputElement.checked = false; 
        todoListElement.append(parent)  
        updateTodoApi({
            id:  parentId,
            done: false,
        })
    }
}

const deleteTodoElement = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".todo input:checked");
    for (const inputElement of allTodosCheckedInputs) { 
        deleteTodo (inputElement.parentElement.attributes["todo-id"].value);
        inputElement.parentElement.remove();
    } 
}


moveToDoneBtn.onclick = moveTodoToDone;
moveToTodoBtn.onclick = moveTodoToTodoList;
deleteTodoBtn.onclick = deleteTodoElement;