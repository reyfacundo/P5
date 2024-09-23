document.querySelector('.add-album').addEventListener('click', e =>{
    e.preventDefault()
    document.body.style.overflow = "hidden"; // Disable scrolling
    document.querySelector('#modal').classList.remove('hidden');
    
})

document.querySelector('#close-modal').addEventListener('click', e =>{
    e.preventDefault()
    document.body.style.overflow = "auto"; // Enable scrolling
    document.querySelector('#modal').classList.add('hidden');
})

