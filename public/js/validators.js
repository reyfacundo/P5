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
        window.location.href = "/index.html"
}

const signUpForm = document.querySelector('#signUpForm');
if (signUpForm) signUpForm.addEventListener('submit', signupValidate);

function signupValidate(e) {
    e.preventDefault()
    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#password').value;
    if (email.length === 0 || pass.length === 0 || name.length === 0 ) {
        Swal.fire({
            icon: "error",
            text: "You must complete all fields",
            confirmButtonColor: "#9ce897",
        })
        return
    }
    window.location.href = "login.html"
}

export function editAlbumForm() {
    const title = document.querySelector('.edit form #title').value;
    const description = document.querySelector('.edit form #description').value;
    const date = document.querySelector('.edit form #date').value;
    const url = document.querySelector('.edit form #url').value;
    if (title.length === 0 || description.length === 0 || date.length === 0 || url.length === 0) {
        return
    }
}

export function addSongForm() {
    const title = document.querySelector('.modal-song form #title').value;
    const description = document.querySelector('.modal-song  form #description').value;
    const date = document.querySelector('.modal-song form #date').value;
    const url = document.querySelector('.modal-song  form #url').value;
    if (title.length === 0 || description.length === 0 || date.length === 0 || url.length === 0) {
        return
    }
}
