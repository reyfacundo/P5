import { changeAlbum, icons, getAlbums, deleteAlbum, addAlbum, addSong, deleteSong } from "./albumRender.js";
import { getAlbum } from "./albumRender.js";
import { getAlbumDataset } from "./albumRender.js";
import { logout } from "./utils/logout.js";
import { redirect } from "./utils/redirect.js";


document.querySelector('.albums-container').addEventListener('click', async (e) => {
    if (e.target.classList.contains('fa-star')) {
        e.target.classList.toggle('checked');
    }
    if (e.target.classList.contains('fa-pencil')) {
        const albumId = e.target.closest('li').dataset.id
        const album = await getAlbumDataset(albumId);
        document.querySelector('.edit form #title').value = album.title;
        document.querySelector('.edit form #description').value = album.description;
        const dateOnly = album.yearOfRelease.split("T")[0];
        document.querySelector('.edit form #date').value = dateOnly;
        document.querySelector('.edit form #url').value = album.url;
        document.querySelector('.edit').classList.toggle('hide');
    }
    if (e.target.classList.contains('album-cover')) {
        const id = e.target.dataset.id
        redirect(`./album.html?album=${id}`);
    }
    if(e.target.classList.contains('fa-trash')){
        deleteAlbum()
    }
});

document.querySelector('.add-album').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});
document.querySelector('.addAlbum .modal-button').addEventListener('click', e => {
    addAlbum();
    e.preventDefault();
});

document.querySelector('.edit .modal-button').addEventListener('click', e => {
    e.preventDefault();
    changeAlbum();
    document.querySelector('.edit').classList.toggle('hide');
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


document.querySelector('.modal-song .modal-button').addEventListener('click', e => {
    addSong()
})

document.querySelector('.closeEdit').addEventListener('click', () => {
    document.querySelector('.edit').classList.toggle('hide');
})
document.querySelector('.album-container').addEventListener('click', e => {
    if(e.target.classList.contains('fa-trash')){
        deleteSong(e)
    }
})
document.querySelector('.logout').addEventListener('click', logout);

getAlbums().then(() => icons());
getAlbum();