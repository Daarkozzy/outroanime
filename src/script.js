document.addEventListener('DOMContentLoaded', () => {
    const animeButton = document.getElementById('anime-button');
    const animeContainer = document.getElementById('anime-container');
    const genreSelect = document.getElementById('genre-select');
    const loadingSpinner = document.getElementById('loadingSpinner');

    async function fetchRandomAnimeWithFilter(genre) {
        try {
            let anime;
            do {
            
                const response = await fetch('https://api.jikan.moe/v4/random/anime');
                const data = await response.json();
                anime = data.data;

                if (genre && !anime.genres.some(g => g.name.toLowerCase() === genre.toLowerCase())) {
                    anime = null; 
                }
            } while (!anime || anime.type !== 'TV'); 

            return anime;
        } catch (error) {
            console.error('Erro ao buscar anime:', error);
        }
    }

    async function showRandomAnime() {
        
        loadingSpinner.style.display = 'block';
        animeContainer.innerHTML = ''; 

        const selectedGenre = genreSelect.value;
        const anime = await fetchRandomAnimeWithFilter(selectedGenre);
        
        if (anime) {
            animeContainer.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" style="max-width: 100%; height: 300px;">
            `;
        }
        
        
        loadingSpinner.style.display = 'none';
    }

    animeButton.addEventListener('click', showRandomAnime);
});


const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

if (burgerMenu && navbarMenu) {
    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("is-active");
        navbarMenu.classList.toggle("is-active");
    });
}

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        burgerMenu.classList.remove("is-active");
        navbarMenu.classList.remove("is-active");
    });
});
