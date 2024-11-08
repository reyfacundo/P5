import { redirect } from "./utils/redirect.js";

const loginForm = document.querySelector('#loginForm');
if (loginForm) loginForm.addEventListener('submit', await loginValidate);

async function loginValidate(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    try {
            let user = {email,password};
            await axios.post(`/users/login`, user);
            redirect("/html/albums.html");
            }
    catch (error) {
        document.querySelector('.credentials').classList.add('valid');
        console.error(error);   
    }
}
const signUpForm = document.querySelector('#signUpForm');
if (signUpForm) signUpForm.addEventListener('submit', await signupValidate);
let passFlag = false;
const passLength = document.getElementById("length");
if (passLength) {
    document.querySelector('.passwordSignUp').addEventListener('focus', e => passLength.style.display = "block");
    document.querySelector('.passwordSignUp').addEventListener('blur', e => passLength.style.display = "none");
    if (signUpForm) signUpForm.addEventListener('keyup', e => {
        if (document.querySelector('.passwordSignUp').value.length >= 8) {
            passLength.classList.remove("invalid");
            passLength.classList.add("valid");
            passFlag = true;
        } else {
            passLength.classList.remove("valid");
            passLength.classList.add("invalid");
            passFlag = false;
        }
    });
}

async function signupValidate(e) {
    e.preventDefault()
    try {
        if (passFlag) {
            const name = document.querySelector('#name').value;
            const lastName = document.querySelector('#lastName').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('.passwordSignUp').value;
            
            let newUser = {name,lastName,email,password};
            
            await axios.post(`/users/signup`, newUser);
            redirect("/");
            return
        }
    }
    catch (error) {
        console.error(error)
    }
}

