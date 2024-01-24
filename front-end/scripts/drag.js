let dragElement; //dabartinis draginamas elementas

const dropZones = document.querySelectorAll (".dropzone"); // vieta kur bus nukeliamas elementas

//Nustatomas elementas kuris yra draginamas
function addDragFunctionalityToAllElements() {
    const allDragableElements = document.querySelectorAll(".draggable")  //pazymeti visus su su ta pacia klase ir visiems prideti eventlistener
    for (const element of allDragableElements) { //iterates over each element in the allDragableElements collection.
        //(dragstart) - nustato elementa kuris yra draginamas. For each element in the loop, an event listener is added. The event being listened for is "dragstart," which typically occurs when a user starts dragging an element
        //(event) => - callback function that will be executed when the "dragstart" event occurs. 
        element.addEventListener("dragstart", (event) => { 
            dragElement = event.target; //element that triggered the event - element that the user is starting to drag.
            event.target.classList.add("dragging"); // dragged elem - make it half transparent
        });
        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");  // reset the transparency
          });
    }
};
addDragFunctionalityToAllElements();


// -------------dropzone listeneriai nebuna perrasomi kai prisideda naujas html element tad jiems nereikia funkciju--------------//

//kiekvinam dropzone (i kur turetu ikristi elementas) priskiriami dragover eventlistener:
for (const dropZone of dropZones) {
    dropZone.addEventListener("dragover", (event) => { 
        event.preventDefault(); //kad nusotu veikti pagrindinis funcionalumas, tam kad galetu priimti (+) naujus elementus
    });

// highlight potential drop target when the draggable element enters it
    dropZone.addEventListener("dragenter", (event) => { 
        // patikrinta ar elementas ant kurio uzvedem turi klase dropzone.(jei tiap - tada ja stilizuojame))
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.add("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");//stilizacijai pridedama klase "dragover"
        }
    });
//kad spalva pasikeistu i originalia jei elementas ne ant dropzone
    dropZone.addEventListener("dragleave", (event) => { 
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
        }
    });

//perkelti elementa pilnai
    dropZone.addEventListener("drop", (event) => { 
        event.preventDefault(); //kad nusotu veikti pagrindinis funcionalumas, tam kad galetu priimti (+) naujus elementus
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
            document.querySelector(".all-todos").appendChild(dragElement)

             // Update the button text to "Done"
            const doneButton = dragElement.querySelector(".todomove");
            if (doneButton) {
                doneButton.textContent = "Done-Drag";
            }
            // doneButton.onclick =  moveFromTodoToDone; //kitaip done drag neveikia 

        } else if (event.target.classList.contains("dropzone")) { //tikrinti ar elementas yra dropzone
            event.target.classList.remove("dragover"); //numti paryskinima 
            event.target.appendChild (dragElement) // appenChild - prijungia child elementa 

            // Update the button text to "Undo"
            const doneButton = dragElement.querySelector(".todomove");
            if (doneButton) {
                doneButton.textContent = "Undo-Drag";
        }
        // doneButton.onclick =  moveFromDoneToTodo; //kitaip undo drag neveikia 
    }
    })  
}
 


