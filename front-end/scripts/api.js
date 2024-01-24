//tikrinimas vyskta todos.html file kuris prijungtas prie api script.
//session check: kad vartotojai galetu matyti todo page tik kai yra prisijunge. O jei nera prisijunge matytu register page

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
 

//funkcijos skirtos kreipimuisi i serveri kad paimti is ten 

//funkcija kuri prideda nauja todo kai papaudziamas "add" button
async function postNewTodo (todo) { //priima pati todo objekta kuris siunciamas su fetch
    try {
        const promise = await fetch ("http://localhost/server/todos", {  //siunciamas request i serveri 
          //naujo todo pridejimas 
            method: "POST", 
            credentials: "include", 
            headers: {   
                "Content-Type": "application/json" // nurodomas duomenu tipas, kuris yra issiunciamas i serveri
             },
            body: JSON.stringify(todo)  // nurodoma kokiu duomenys norime perduoti serveriui. negalim naduoti objekto o tik string formato duomenys
        });
        const result = await promise.json(); //fetch result
        // console.log(result); 

        return result;
    } catch (error) {}
}

//panaudojma "todoDialogActions.js"


//funkcija kuri gaus visus todo (kad po refrsh jie vis dar liktu) (panaudojama todoDialogActions.js function showAlltodos)
async function getAllTodos() {
    try {
        const promise = await fetch ("http://localhost/server/todos") //nereikia nustatymu nes cia naudojam GET ir jis yra by default
        const result = await promise.json();
        console.log(result);
        showAllTodos(result.filter((todo) => !todo.done)); //todo.done === false ->pridedama i todo lentele
        showAllDones (result.filter((todo) => todo.done)); //todo.done === true ->pridedama i done lentele
        return result; //masyvas 
    } catch (error) {
             }
}

//todo atnaujinimo funkcija
async function updateTodo (todo){
    const promise = await fetch (`http://localhost/server/todos/${todo.id}`, {
        credentials: "include", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo) 
    }); 
    const result = await promise.json();
    if (!promise.ok){// jei atsakymas nesekmingas
        console.error ("Atsakymas is endpoint /todos/45 buvo nesekmingas");
    }
    else {
        return result;
    }
}
//funkcija panaudojama "todoDialogactions"