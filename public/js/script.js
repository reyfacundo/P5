
import { getAlbums, addAlbum} from "./albumRender.js";
import { getAlbumDataset } from "./albumRender.js";

document.querySelector('.albums-container').addEventListener('click', async (e) => {
    if (e.target.classList.contains('fa-star')) {
        e.target.classList.toggle('checked');
    }
    if (e.target.classList.contains('album-cover')) {
        const id = e.target.dataset.id
        window.location.href = `./album.html?album=${id}`
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

document.querySelector('#close-modal').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.modal').classList.toggle('hide');
});



getAlbums()
