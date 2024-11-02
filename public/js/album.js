// const axios = require('axios');

export const getAlbums = async () => {
    try {
        const response = await axios.get('/band')
        response.data.map((album) => {
            console.log(album)
            renderAlbums(album)
        })
    }
    catch (error) {
        console.log(error)
        // Aviso de error al cargar los albums
    }
}
function renderAlbums(album){
    const albumCover = document.createElement('div');
    const albumOptions = document.createElement('span');
    const icon = document.createElement('i');
    const star = document.createElement('span');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const container = document.querySelector('.albums-container');

    albumCover.classList.add('album-cover');
    albumOptions.classList.add('album-options');
    icon.classList.add('fa','fa-pencil');
    star.classList.add('fa','fa-star');
    a.href = "./html/albums/life.html";
    img.src = "./assets/25-cover.jpg";
    img.alt = "2521-album-cover";
    h2.textContent = 'asd';

    albumOptions.append(icon,star);
    a.appendChild(img)
    albumCover.append(albumOptions,a,h2);
    container.appendChild(albumCover)
}
