document.addEventListener('DOMContentLoaded', () => {
    const animeButton = document.getElementById('anime-button');
    const animeContainer = document.getElementById('anime-container');

    async function fetchRandomAnime() {
        try {
            // Fetch a random anime from the Jikan API
            const response = await fetch('https://api.jikan.moe/v4/random/anime');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Erro ao buscar anime:', error);
        }
    }

    async function showRandomAnime() {
        const anime = await fetchRandomAnime();
        if (anime) {
            animeContainer.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" style="max-width: 100%; height: auto;">
            `;
        }
    }

    animeButton.addEventListener('click', showRandomAnime);
});
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});
