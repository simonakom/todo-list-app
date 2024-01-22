let dragElement; 
const dropZones = document.querySelectorAll (".dropzone"); 

function addDragFunctionalityToAllElements() {
    const allDragableElements = document.querySelectorAll(".draggable")  
    for (const element of allDragableElements) { 
        element.addEventListener("dragstart", (event) => { 
            dragElement = event.target; 
            event.target.classList.add("dragging"); 
        });
        element.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging"); 
          });
    }
};
addDragFunctionalityToAllElements();


for (const dropZone of dropZones) {
    dropZone.addEventListener("dragover", (event) => { 
        event.preventDefault(); 
    });

    dropZone.addEventListener("dragenter", (event) => { 
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.add("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");
        }
    });

    dropZone.addEventListener("dragleave", (event) => { 
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
        } else if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
        }
    });

    dropZone.addEventListener("drop", (event) => { 
        event.preventDefault(); 
        if (event.target.parentElement.classList.contains("todo-list")) {
            event.target.parentElement.classList.remove("dragover")
            document.querySelector(".all-todos").appendChild(dragElement);
            updateTodo({done: true});

        } else if (event.target.classList.contains("dropzone")) { 
            event.target.classList.remove("dragover"); 
            event.target.appendChild (dragElement); 
            updateTodo({done: false});
        }
    })  
}
 


