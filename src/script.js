document.addEventListener('DOMContentLoaded', () => {
    const animeButton = document.getElementById('anime-button');
    const animeContainer = document.getElementById('anime-container');
    const genreSelect = document.getElementById('genre-select');


    async function fetchRandomAnimeWithFilter(genre) {
        try {
            let anime;
            do {
                // Fetch a random anime from the Jikan API
                const response = await fetch('https://api.jikan.moe/v4/random/anime');
                const data = await response.json();
                anime = data.data;

                // Check if the anime matches the selected genre
                if (genre && !anime.genres.some(g => g.name.toLowerCase() === genre.toLowerCase())) {
                    anime = null; // Não exibir se o gênero não corresponder
                }
            } while (!anime || anime.type !== 'TV'); // Repetir até encontrar um anime do tipo "TV" e do gênero correto

            return anime;
        } catch (error) {
            console.error('Erro ao buscar anime:', error);
        }
    }

    async function showRandomAnime() {
        const selectedGenre = genreSelect.value;
        const anime = await fetchRandomAnimeWithFilter(selectedGenre);
        if (anime) {
            animeContainer.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" style="max-width: 100%; height: 300px;">
            `;
        }
    }

    animeButton.addEventListener('click', showRandomAnime);
});


// Navbar Menu code
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
