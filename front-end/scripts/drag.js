let dragElement; //current draggable element

const dropZones = document.querySelectorAll (".dropzone"); //location where the element will be moved

//Determine the element that is to be dragged
function addDragFunctionalityToAllElements() {
    const allDragableElements = document.querySelectorAll(".draggable")  //mark all with the same class and add eventlistener to all
    for (const element of allDragableElements) { //iterates over each element in the allDragableElements collection.
        //(dragstart) - identifies the element that is being dragged. For each element in the loop, an event listener is added. The event being listened for is "dragstart," which typically occurs when a user starts dragging an element
        //(event) => - callback function that will be executed when the "dragstart" event occurs. 
        element.addEventListener("dragstart", (event) => { 
            dragElement = event.target; //element that triggered the event - element that the user is starting to drag.
            event.target.classList.add("dragging"); // dragged element - make it half transparent
        });
        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");  // reset the transparency
          });
    }
};
addDragFunctionalityToAllElements();

// -------------dropzone listeners are not rewritten when a new html element is added so they don't need functions--------------//

// to each dropzone (where the element should land) a dragover eventlistener is assigned:
for (const dropZone of dropZones) {
    dropZone.addEventListener("dragover", (event) => { 
        event.preventDefault(); //to stop the main functionality in order to accept (+) new elements
    });

// highlight potential drop target when the draggable element enters it
    dropZone.addEventListener("dragenter", (event) => { 
        // checking if the element on which we have placed the  class "dropzone" is present (if it is, then we stylise it))
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.add("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");//class "dragover" is added for stylisation
        }
    });
//to change the colour to the original colour if the element is not on a dropzone
    dropZone.addEventListener("dragleave", (event) => { 
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
        }
    });

//move the item completely
    dropZone.addEventListener("drop", (event) => { 
        event.preventDefault(); //to stop the main functionality in order to accept (+) new elements
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
            document.querySelector(".all-todos").appendChild(dragElement)

             // Update the button text to "Done"
            const doneButton = dragElement.querySelector(".todomove");
            if (doneButton) {
                doneButton.textContent = "Done-Drag";
            }
            // doneButton.onclick =  moveFromTodoToDone; //otherwise done drag does not work 

        } else if (event.target.classList.contains("dropzone")) { //check if the item is in a dropzone
            event.target.classList.remove("dragover"); //remove the highlight 
            event.target.appendChild (dragElement) // appenChild - connects the child element 

            // Update the button text to "Undo"
            const doneButton = dragElement.querySelector(".todomove");
            if (doneButton) {
                doneButton.textContent = "Undo";
        }
        // doneButton.onclick =  moveFromDoneToTodo; //otherwise undo drag does not work 
    }
    })  
}
 


