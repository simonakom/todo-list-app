//-------------------------------Sesision check-----------------------------------------------------------------------//

async function checkSession() {
    try {
        const promise = await fetch ("http://localhost/server/users/session-check", {credentials: "include"}); 
        const answer = await promise.json();
        if (answer.sessionValid) { 
            window.location.href = "http://localhost/todos.html" - netinka    
        }
    } catch(err){ 
        console.log(err);
    }
}
checkSession()

//-------------------------------Signin--------------------------------------------------------------------------------//
const usernameField = document.querySelector("#register-username");
const emailField = document.querySelector("#register-email");
const passwordField = document.querySelector("#reigster-password");
const registerButton = document.querySelector("#send-registration");

const loginButton = document.querySelector("#log-in");
const logPassword = document.querySelector("#log-password");
const logUsername = document.querySelector("#log-username");

async function register () {
     const promise = await fetch ("http://localhost/server/users/register", 
     { method: "POST", 
        credentials: 'include', 
        headers: { 
             "Content-Type": "application/json" 
         },
         body: JSON.stringify({  
             username: usernameField.value,
             email: emailField.value,
             password: passwordField.value,
         }),
    })
    const response = await promise.text(); 
    console.log(response);
}  
registerButton.onclick = register; 

//-------------------------------Login---------------------------------------------------------------------------------//
async function login () {
        fetch("http://localhost/server/users/login", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: logUsername.value,
            password: logPassword.value,
        }),
    })
    .then((response) => response.json()) 
    .then((response) => (window.location.href = response.url)) 
    .catch((err) => console.log(err)); 
}
loginButton.onclick = login; 