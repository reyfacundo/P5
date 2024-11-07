const loginForm = document.querySelector('#loginForm');
if (loginForm) loginForm.addEventListener('submit', loginValidate);

function loginValidate(e) {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#password').value;
    if (email.length === 0 || pass.length === 0) {
        Swal.fire({
            icon: "error",
            text: "You must complete all fields",
            confirmButtonColor: "#9ce897",
        })
        return
    }
    if (pass.length <= 6)
        window.location.href = "/"
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
            const pass = document.querySelector('.passwordSignUp').value;
            
            let newUser = {name,lastName,email,password : pass};
            
            await axios.post(`/users`, newUser);

            window.location.href = "login.html"
            return
        }
        alert("NUH UHHH")
    }
    catch (error) {
        console.error(error)
    }
}

