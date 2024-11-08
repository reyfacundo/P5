import { redirect } from "./utils/redirect.js";
import { editAlbumForm, addAlbumForm, addSongForm } from "./validators.js";

export const getAlbums = async () => {
    try {
        const response = await axios.get('/band')
        response.data.forEach((album) => {
            renderAlbums(album);
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            redirect('/');
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}
function renderAlbums(album) {
    const albumCover = document.createElement('li');
    const albumOptions = document.createElement('span');
    const star = document.createElement('span');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const container = document.querySelector('.albums-container');

    albumCover.classList.add('album-cover');
    albumOptions.classList.add('album-options');
    albumCover.dataset.id = album._id;
    star.classList.add('fa', 'fa-star');
    img.src = album.coverImageUrl;
    img.alt = "album-cover";
    h2.textContent = album.title;

    albumOptions.appendChild(star);
    a.appendChild(img)
    albumCover.append(albumOptions, a, h2);
    container.appendChild(albumCover)
}

export function icons() {
    document.querySelectorAll('.albums-container li').forEach(e => {
        let [album, albumId] = window.location.search.slice(1).split('=');
        if (e.dataset.id == albumId) {
            const editIcon = document.createElement('i');
            const deleteIcon = document.createElement('i');
            const albumOptions = e.querySelector('.album-options');
            editIcon.classList.add('fa', 'fa-pencil');
            deleteIcon.classList.add('fa', 'fa-trash');
            albumOptions.append(editIcon, deleteIcon);
        }
    });
}

export const getAlbum = async () => {
    try {
        let [album, albumId] = window.location.search.slice(1).split('=');
        const response = await axios.get(`/band/${albumId}`);
        renderAlbum(response.data)
    }
    catch (error) {
        console.error(error)
    }
}
function renderAlbum(album) {
    const bg = document.querySelector('.bg')
    bg.style.backgroundImage = `url(${album.coverImageUrl})`;
    const albumContainer = document.querySelector('.album-container');


    const albumTitle = document.createElement('h1');
    albumTitle.textContent = album.title;
    const description = document.createElement('p');
    description.textContent = album.description;

    const ul = document.createElement('ul');
    ul.classList.add('songs');

    album.songs.forEach((e, i) => {
        const li = document.createElement('li');
        li.dataset.songId = e._id
        const firstHalfSpan = document.createElement('span');
        firstHalfSpan.classList.add('first-half');
        const numberSpan = document.createElement('span');
        numberSpan.textContent = `${i + 1} •`;
        const img = document.createElement('img');
        img.src = "../../assets/placeholder.png";
        img.alt = "song-placeholder";
        const h3 = document.createElement('h3');
        h3.textContent = e.title;
        const secondHalfSpan = document.createElement('span');
        secondHalfSpan.classList.add('second-half');
        const anchor = document.createElement('a');
        const durationSpan = document.createElement('span');
        durationSpan.textContent = e.duration;
        const playSpan = document.createElement('span');
        const playImg = document.createElement('img');
        playImg.classList.add('play')
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-trash', 'song-delete');
        if (e.url) {
            anchor.href = e.url;
            anchor.target = "_blank";
        }
        playImg.src = "../../assets/play_circle_24dp_5F6368_FILL1_wght400_GRAD0_opsz24.svg";
        anchor.appendChild(playImg);
        li.append(firstHalfSpan, secondHalfSpan)
        firstHalfSpan.append(numberSpan, img, h3);
        secondHalfSpan.append(durationSpan, playSpan, deleteIcon);
        playSpan.appendChild(anchor);
        ul.appendChild(li)
    });

    albumContainer.append(albumTitle, description, ul)
}

export const getAlbumDataset = async (albumId) => {
    try {
        const response = await axios.get(`/band/${albumId}`);
        return response.data
    }
    catch (error) {
        console.error(error)
    }
}

export const changeAlbum = async () => {
    try {
        let [a, albumId] = window.location.search.slice(1).split('=');
        let { title, description, date, url } = editAlbumForm();
        url = url.trim()
        let objectToSend = { title, description, yearOfRelease: date, coverImageUrl: url }
        if (url === '' || url === "undefined") {
            objectToSend = { title, description, yearOfRelease: date, coverImageUrl: undefined }
        }
        await axios.patch(`/band/${albumId}`, objectToSend);
        redirect(`./album.html?album=${albumId}`);
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteAlbum = async () => {
    try {
        let [album, albumId] = window.location.search.slice(1).split('=');
        await axios.delete(`/band/${albumId}`);
        redirect(`/html/albums.html`);
    }
    catch (error) {
        console.error(error)
    }
}
export const addAlbum = async () => {
    try {
        let { title, description, date, url } = addAlbumForm();
        url = url.trim()
        let objectToSend = { title, description, yearOfRelease: date, coverImageUrl: url }
        if (url === '') {
            objectToSend = { title, description, yearOfRelease: date, coverImageUrl: undefined }
        }
        const response = await axios.post(`/band`, objectToSend);
        redirect(`./album.html?album=${response.data._id}`);
    }
    catch (error) {
        console.error(error)
    }
}
export const addSong = async () => {
    try {
        let [album, albumId] = window.location.search.slice(1).split('=');
        const { title, duration, url } = addSongForm();
        const objectToSend = { title, duration, url }
        const response = await axios.post(`/band/${albumId}`, objectToSend);
        window.location.href = `./album.html?album=${albumId}`
    }
    catch (error) {
        console.error(error)
    }
}
export const deleteSong = async (e) => {
    try {
        const [album, albumId] = window.location.search.slice(1).split('=');
        const songId = e.target.closest('li').dataset.songId;
        await axios.delete(`/band/${albumId}/${songId}`);
        window.location.href = `./album.html?album=${albumId}`
        redirect(`./album.html?album=${albumId}`);
    }
    catch (error) {
        console.error(error);
    }
}