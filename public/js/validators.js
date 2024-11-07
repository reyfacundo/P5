export function editAlbumForm() {
    const title = document.querySelector('.edit form #title').value;
    const description = document.querySelector('.edit form #description').value;
    const date = document.querySelector('.edit form #date').value;
    const url = document.querySelector('.edit form #url').value;
    return { title, description, date, url }
}
export function addAlbumForm() {
    const title = document.querySelector('.addAlbum #title').value;
    const description = document.querySelector('.addAlbum #description').value;
    const date = document.querySelector('.addAlbum #date').value;
    const url = document.querySelector('.addAlbum #url').value;
    return { title, description, date, url }
}

export function addSongForm() {
    const title = document.querySelector('.modal-song form #title').value;
    const duration = document.querySelector('.modal-song form #duration').value;
    const url = document.querySelector('.modal-song  form #url').value;
    if (title.length === 0 || duration.length === 0) {
        return
    }
    return { title, duration, url }
}
