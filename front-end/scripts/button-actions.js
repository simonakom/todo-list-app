const moveToDoneBtn = document.querySelector("#moveToDone");
const moveToTodoBtn = document.querySelector("#moveToTodo");
const deleteTodoBtn = document.querySelector("#deleteTodoBtn");

//kitamijeji is moveTodo.js
// const doneListElement = document.querySelector(".done-list");
// const todoListElement = document.querySelector(".all-todos");


const moveTodoToDone = () => {
    //gauti visus checked inputus 
    const allTodosCheckedInputs = document.querySelectorAll(".all-todos .todo input:checked");
    //kad perkelti visus pazymetus elementus (ne checkbox o input): kiekvinoj iteacijoj imama po input
    for (const inputElement of allTodosCheckedInputs) {  //kiekvineoj iteracijoj gaunamas po inputElement.parentElement - parent element ("todo") (galima pasitikrinti console.log ivedus: "[document.querySelector('.todo')])

        // Update the button text to "Undo"
        const parent = inputElement.parentElement; //kad pasikeistu tekstas prie undo button
        const parentId = parent.attributes["todo-id"].value; //kreipiamasi su [todo-id] nes yra "-". Atributes yra objektas.
        const textElement = document.querySelector(`[todomove="${parentId}"]`); //kreipiamasi i todo-id vaika = todo-text
        textElement.innerText = "Udone-button"; 
        textElement.onclick =  moveFromDoneToTodo; // kitaip undo button neveikia 

        inputElement.checked = false; //perkeltas elementas yra un-checked.
        //perkleti is todo list i done list
        doneListElement.append(inputElement.parentElement) //prides i done list kaip paskutini "child" element 
    }
    // console.log(allTodosCheckedInputs);
}
moveToDoneBtn.onclick = moveTodoToDone;

const moveTodoToTodoList = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".done-list .todo input:checked"); //keiciasi tik list
    for (const inputElement of allTodosCheckedInputs) { 

        // Update the button text to "Done"
        const parent = inputElement.parentElement; //kad pasikeistu tekstas prie undo button
        const parentId = parent.attributes["todo-id"].value; //kreipiamasi su [todo-id] nes yra "-". Atributes yra objektas.
        const textElement = document.querySelector(`[todomove="${parentId}"]`); //kreipiamasi i todo-id vaika = todo-text
        textElement.innerText = "Done-button"; 
        textElement.onclick =  moveFromTodoToDone; // kitaip done buttin neveikia 

        inputElement.checked = false; 
        todoListElement.append(inputElement.parentElement) //prides i todo list kaip paskutini "child" element 
    }
}
moveToTodoBtn.onclick = moveTodoToTodoList;

const deleteTodoElement = () => {
    const allTodosCheckedInputs = document.querySelectorAll(".todo input:checked");
    for (const inputElement of allTodosCheckedInputs) { 
        inputElement.parentElement.remove(); //istrinti elementa
    } 
}
deleteTodoBtn.onclick = deleteTodoElement;