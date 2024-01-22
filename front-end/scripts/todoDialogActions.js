const texts = {
    moveElementText: {
        todo: "Done-dialog",
        done: "Undone-dialog"
    }
}
const doneListElement = document.querySelector(".done-list");
const todoListElement = document.querySelector(".all-todos");
const todoInputElement = document.querySelector("#todo-input");
const todoSubmitElement = document.querySelector("#todo-submit");

//------------------------Move Element (add eventListeners)---------------------------------------------------------//
function moveFromTodoToDone (event) { 
    const targetId = event.target.attributes.todomove.value 
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    doneListElement.appendChild(moveTarget)
    moveFromTodoToDoneTextUpdate (event);
    updateTodoApi({id: targetId, done: true})
}
function moveFromTodoToDoneTextUpdate (event) {
    event.target.innerText = texts.moveElementText.done; 
    event.target.onclick = moveFromDoneToTodo;
}
function moveFromDoneToTodo (event) { 
    const targetId = event.target.attributes.todomove.value 
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    todoListElement.appendChild(moveTarget)
    moveFromDoneToTodoTextUpdate (event);
    updateTodoApi({id: targetId, done: false})
} 
function moveFromDoneToTodoTextUpdate (event) {
    event.target.innerText = texts.moveElementText.todo;  
    event.target.onclick = moveFromTodoToDone;
}
//-----------------------------Update Element (pop-up)--------------------------------------------------------------//

function updateTodo (event) {
    const targetId = event.target.attributes.todoupdate.value; 
    const updateTarget = document.querySelector(`[todo-id="${targetId}"] .todo-text`);  
    updateTarget.innerText = prompt("Update your task here...", updateTarget.innerText) 
    updateTodoApi({id: targetId, todo: updateTarget.innerText}) 
}; 
 
//---------------------------Add Element----------------------------------------------------------------------------//

function addClickListenersToTodoDialogButtons () {
const todoMoveButtonsinTodoList = document.querySelectorAll(".all-todos .todomove");
const todoMoveButtonsinDoneList = document.querySelectorAll(".done-list .todomove");
const todoDeleteButtons = document.querySelectorAll(".tododelete");
const todoUpdateButtons = document.querySelectorAll(".todoupdate");

// update todo
for (const updateTodoButton of todoUpdateButtons) { 
    updateTodoButton.onclick = updateTodo; 
    }
// move todo
for (const todoMoveButton of todoMoveButtonsinTodoList) {
    todoMoveButton.onclick = moveFromTodoToDone;
    console.log("1");
}
for (const todoMoveButton of todoMoveButtonsinDoneList) {
    todoMoveButton.onclick = moveFromTodoToDone;
    console.log("2");
}
// delete todo
for (const deleteButton of todoDeleteButtons) {
    deleteButton.onclick = (event) => {
        const targetId = event.target.attributes.tododelete.value;
        const deleteTarget = document.querySelector(`[todo-id="${targetId}"]`);
        deleteTodo(targetId);
        deleteTarget.remove();
    };
    } 
}

async function addNewTodo () {  
        
    const inputValue = todoInputElement.value;  
    todoInputElement.value = "";  

    const response = await postNewTodo ({  
        todo: inputValue,
    }) 
    console.log(response); 

    const newTodoObject = response.newTodo;  
    
    const newTodo = generateTodoHTML(newTodoObject);
todoListElement.innerHTML += newTodo;
addDragFunctionalityToAllElements(); 
addClickListenersToTodoDialogButtons(); 
}

todoSubmitElement.onclick = addNewTodo; 

//-------------------------------Add todo by "Enter"-----------------------------------------------------------------------------//
todoInputElement.onkeydown = (event) => {
    if (event.key === "Enter") addNewTodo();
};
 
//----------------------------PAGE REFRESH: show todos/dones --------------------------------------------------------------------//
function showAllTodos(todos) {  
    let innerHtml = ''; 
    for (const todo of todos) {  
    innerHtml += generateTodoHTML(todo)
    }
    todoListElement.innerHTML += innerHtml; 
    addDragFunctionalityToAllElements(); 
    addClickListenersToTodoDialogButtons();
} 
function showAllDones(todos) { 
    let innerHtml = ''; 
    for (const todo of todos) {
        innerHtml += generateTodoHTML(todo);
    }
    doneListElement.innerHTML += innerHtml; 
    addDragFunctionalityToAllElements(); 
    addClickListenersToTodoDialogButtons();
}

function generateTodoHTML (todo) {
    console.log(todo);
    return `   
    <div todo-id="${todo.id}" class="todo d-flex justify-content-between draggable" draggable="true">
    <input class="form-check-input check-color" type="checkbox" name="todo"   >
    <span class="todo-text">${todo.todo}</span> 

    <div class="dropdown">
        <i class= "bi bi-chevron-bar-down" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu drop-color">
          <li><a class="dropdown-item todomove" todomove="${todo.id}" href="#">Done</a></li>
          <li><a class="dropdown-item tododelete" tododelete="${todo.id}" href="#">Delete</a></li>
          <li><a class="dropdown-item todoupdate" todoupdate="${todo.id}" href="#">Update</a></li>
        </ul> 
      </div>
</div>`;
}

getAllTodos()




