import { editAlbumForm } from "./validators.js";
import { addSongForm } from "./validators.js";

document.querySelector('.add-album').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});

document.querySelector('#close-modal').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});

const openSongModal = document.querySelector('.add-song');
if (openSongModal) openSongModal.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal-song').classList.toggle('hide');
});

const closeSongModal = document.querySelector('#close-modal-song');
if (closeSongModal) closeSongModal.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal-song').classList.toggle('hide');
});

document.querySelectorAll('.fa-star').forEach(e => {
    e.addEventListener('click', (e) => {
        e.target.classList.toggle('checked');
    })
})

document.querySelector('.edit .modal-button').addEventListener('click', editAlbumForm);

const addSongModal = document.querySelector('.modal-song .modal-button');
if (addSongModal) addSongModal.addEventListener('click', addSongForm);

document.querySelectorAll('.fa-pencil').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('.edit').classList.toggle('hide');
    })
})

document.querySelector('.closeEdit').addEventListener('click', () => {
    document.querySelector('.edit').classList.toggle('hide');
})
