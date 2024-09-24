document.querySelector('.add-album').addEventListener('click', e =>{
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});

document.querySelector('#close-modal').addEventListener('click', e =>{
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});

document.querySelector('.add-song').addEventListener('click', e =>{
    e.preventDefault();
    document.querySelector('.modal-song').classList.toggle('hide');
});

document.querySelector('#close-modal-song').addEventListener('click', e =>{
    e.preventDefault();
    document.querySelector('.modal-song').classList.toggle('hide');
});
