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


//------------------------Move Element (add eventListeners-------------------------------------------------//
  
function moveFromTodoToDone (event) { //moved to done
    const targetId = event.target.attributes.todomove.value //identifiable attribute (number)
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    doneListElement.appendChild(moveTarget)//add move target as a child to done list
    event.target.innerText = texts.moveElementText.done; // the value of button is changed and which value is specified
    event.target.onclick = moveFromDoneToTodo;
}

function moveFromDoneToTodo (event) { //moved back to undone 
    const targetId = event.target.attributes.todomove.value //identifiable attribute (number)
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    todoListElement.appendChild(moveTarget)//add move target as child back to undone list
    event.target.innerText = texts.moveElementText.todo;  
    event.target.onclick = moveFromTodoToDone;
} 

//--------------------Update Element (text in pop-up)----------------------------------//

function updateTodo (event) {
    const targetId = event.target.attributes.todoupdate.value; //identifiable attribute (number)
    const updateTarget = document.querySelector(`[todo-id="${targetId}"] .todo-text`);  //editable item. .todo-text because it specifies exactly what we are changing
    updateTarget.innerText = prompt("Update your task here...", updateTarget.innerText) //prompt: pop-up table
}
 
//--------------------Update Element (text in input)------------------------------------//
// const updateButtons = document.querySelectorAll(".todoupdate");
// const input = document.querySelector(".input");
// const button = document.querySelector(".addButton");
// const updateInput = document.querySelector(".updateInput");
// const updateButton = document.querySelector(".updateButton");


// // Function to update the task and hide the update input field/button
// function updateTask(targetId, currentValue) { //targetId represents the ID of the task to be updated/ currentValue represents the current text content of the task.
//     const updateTarget = document.querySelector(`[todo-id="${targetId}"] span`); //selects HTML element based on id //span : to change the text content inside this span element
//     updateInput.value = currentValue; 

//     updateInput.style.display = "inline-block";
//     updateButton.style.display = "inline-block";
//     input.style.display = "none";
//     button.style.display = "none";

//     updateButton.onclick = () => {
//         updateTarget.innerText = updateInput.value;
//         input.style.display = "inline-block";
//         button.style.display = "inline-block";
//         updateInput.style.display = "none";
//         updateButton.style.display = "none"; 
//         updateInput.value = ""; 
//         input.value = ""; 
//     };
// }
// // Attach click events to update buttons
// for (const updateButton of updateButtons) {
//     updateButton.onclick = (event) => {
//         event.stopPropagation(); // Prevent event propagation
//         const targetId = event.target.attributes.todoupdate.value;
//         const currentValue = document.querySelector(`[todo-id="${targetId}"] span`).innerText;
//         updateTask(targetId, currentValue);
//     };
// }

//-----------------------Add Element---------------------------------------------------//

//the event listener is removed when a new to-do is added, so functions are needed that... 
function addClickListenersToTodoDialogButtons () {
const todoMoveButtonsinTodoList = document.querySelectorAll(".all-todos .todomove");
const todoMoveButtonsinDoneList = document.querySelectorAll(".done-list .todomove");
const todoDeleteButtons = document.querySelectorAll(".tododelete");
const todoUpdateButtons = document.querySelectorAll(".todoupdate");

// update todo
for (const updateTodoButton of todoUpdateButtons) { //iterated over the whole list
    updateTodoButton.onclick = updateTodo; //each update button will be assigned an onclick
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
        deleteTarget.remove();
    };
    } 
}
// addClickListenersToTodoDialogButtons(); 

async function addNewTodo () {  //the server (api.js) must be contacted and a response from the server must be received
        
    const inputValue = todoInputElement.value;  //so that the value from input is obtained
    todoInputElement.value = "";  //as soon as we get a value, we turn it into an empty one (to erase it).
    //the response will be received from the server (received to-do id and value). Since new html is generated, the event listener will dissapear from the dialog buttons and drag so they need functions. Checkbox works because there are no eventlisteners
    //until the back-end is in place, the delete/update (buttons) functions will not work at all, because a common id is assigned to all elements.

    const response = await postNewTodo ({ //object where the result is stored //"todo" post request: send to server 
        // username: "Simona", //logged in user
        todo: inputValue,
    }) 
    console.log(response); //Object to be returned 

    const newTodoObject = response.newTodo; //from the returned object the "newTodo" object is taken 
    // console.log(newTodoObject);
    
    const newTodo = generateTodoHTML(newTodoObject);
todoListElement.innerHTML += newTodo;
addDragFunctionalityToAllElements(); //the drag file must be imported before other files
addClickListenersToTodoDialogButtons(); //so new elements would have //delete/update functions
}

todoSubmitElement.onclick = addNewTodo; //works by pressing a button


//-----------------------Add todo by "Enter"-------------------------------------------//
todoInputElement.onkeydown = (event) => {
    if (event.key === "Enter") addNewTodo();
};
 
//-----------------------PAGE REFRESH: show todos/dones ------------------------------//
function showAllTodos(todos) {  //"todo" - specifies the todo array // the function is called from "api"
    let innerHtml = ''; 
    for (const todo of todos) {  //by received array iteration is looped and html is generated
    // innerHtml add code
    innerHtml += generateTodoHTML(todo)
    }
    todoListElement.innerHTML += innerHtml; //so that the generated html is visible on the main page
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

//-----------------------generate todo function for showAllTodos&showAllDones functions ------------------------------//

function generateTodoHTML (todo) {
    console.log(todo);
    return `   
    <div todo-id="${todo.id}" class="todo d-flex justify-content-between draggable overflow-hidden" draggable="true">
    <input class="form-check-input check-color" type="checkbox" name="todo">
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

getAllTodos() //  function from "api"




