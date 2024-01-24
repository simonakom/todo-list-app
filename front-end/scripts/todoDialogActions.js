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
  
function moveFromTodoToDone (event) { //perkelimas i done
    const targetId = event.target.attributes.todomove.value //identifikuojamas atributas (skaicius)
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    doneListElement.appendChild(moveTarget)//prideti move target kaip vaika i done list
    event.target.innerText = texts.moveElementText.done; // keiciamas button reiksme ir nurodoma kuri reiksme
    event.target.onclick = moveFromDoneToTodo;
}

function moveFromDoneToTodo (event) { //perkelimas atgal i undone 
    const targetId = event.target.attributes.todomove.value //identifikuojamas atributas (skaicius)
    const moveTarget = document.querySelector(`[todo-id="${targetId}"]`);
    todoListElement.appendChild(moveTarget)//prideti move target kaip vaika atgal i undone list
    event.target.innerText = texts.moveElementText.todo;  
    event.target.onclick = moveFromTodoToDone;
} 

//--------------------Update Element (text in pop-up)----------------------------------//

function updateTodo (event) {
    const targetId = event.target.attributes.todoupdate.value; //identifikuojamas atributas (skaicius)
    const updateTarget = document.querySelector(`[todo-id="${targetId}"] .todo-text`);  //redaguojamas elementas. .todo-text nes nurodo ta tiksliai kesime
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
//     const updateTarget = document.querySelector(`[todo-id="${targetId}"] span`); //selects HTML element based on id //span :  to change the text content inside this span element
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

//event listener pasisalina kai pridideda naujas todo tad reikia funkciju kad 
function addClickListenersToTodoDialogButtons () {
const todoMoveButtonsinTodoList = document.querySelectorAll(".all-todos .todomove");
const todoMoveButtonsinDoneList = document.querySelectorAll(".done-list .todomove");
const todoDeleteButtons = document.querySelectorAll(".tododelete");
const todoUpdateButtons = document.querySelectorAll(".todoupdate");

// update todo
for (const updateTodoButton of todoUpdateButtons) { //iteruojama per visa sarasa
    updateTodoButton.onclick = updateTodo; //keikvienam update mygtukui bus priskirtas onclick
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

async function addNewTodo () {  //turi buti kreipiamasi i serveri (api.js) ir gaunamas todo  atsakymas is serverio
        
    const inputValue = todoInputElement.value;  //kad reiksme is input butu gaunama
    todoInputElement.value = "";  //kai tik gaunam reiksme, ja paverciam i tuscia. (kad isitrintu  )
    // atsakymas bus gaunamas is serverio (gaunamas todo id ir value). Kadangi generuojamas naujas html, event listener pradings no dialog mtgtuku ir drag tad reikia jiems funkciju. Checkbox veikia, nes ten nera eventlisteners
    //kol nera back-en pilnai neveiks delete/update (mygtukai)..funkcijos nes priskiriamas bednras id visiem elementams

    const response = await postNewTodo ({ //objektas kuriame saugojamas rezultatas //"todo" post request: siusti i serveri 
        // username: "Simona", //prisijunges vartotojas
        todo: inputValue,
    }) 
    console.log(response); //Grazinamas objektas 

    const newTodoObject = response.newTodo; //is grazinamo objekto istraukiama "newTodo" Objektas 
    // console.log(newTodoObject);
    
    const newTodo = generateTodoHTML(newTodoObject);
todoListElement.innerHTML += newTodo;
addDragFunctionalityToAllElements(); //drag failas turi buti importuojamas pirmiau nei kiti failai
addClickListenersToTodoDialogButtons(); //kad nuaji elementai butu su funkcijom  //delete/update
}

todoSubmitElement.onclick = addNewTodo; //veikia paspaudus ant mygtuko


//-----------------------Add todo by "Enter"-------------------------------------------//
todoInputElement.onkeydown = (event) => {
    if (event.key === "Enter") addNewTodo();
};
 
//-----------------------PAGE REFRESH: show todos/dones ------------------------------//
function showAllTodos(todos) {  //"todo" - nurodomas todo masyva  // funkcija kvieciama is "api"
    let innerHtml = ''; 
    for (const todo of todos) {  //pagal gauta masyva sukamas siklas ir generuojama html
    // innerHtml pridedmas kodas
    innerHtml += generateTodoHTML(todo)
    }
    todoListElement.innerHTML += innerHtml; //kad sugeneruotas html matytuse pgr. page
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

getAllTodos() //  funkcija is "api"




