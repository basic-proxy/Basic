const gameContainer = document.querySelector('.game-container');

function scrollTags(direction) {
    const tagsContainer = document.querySelector('.game-tag-group-wrapper');
    const scrollAmount = 200; // Use to adjust speed of game render (the gradual appearance thing)

    if (direction === 'left') {
        tagsContainer.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        tagsContainer.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

const buttons = document.querySelectorAll('.rgb-button');

function renderGames(filteredGames) {
    gameContainer.innerHTML = '';

    filteredGames.forEach((game, index) => {
        const card = document.createElement('a');
        card.className = 'game-card';
        card.href = game.gameLink;
        card.innerHTML = `
            <img src="${game.imgSrc}" alt="${game.name}">
            <button class="info-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                </svg>
            </button>
            <div class="game-title">${game.name}</div>
        `;

        card.querySelector('.info-button').addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            showModal(game.name, game.tags, game.description, game.gameLink, game.imgSrc);
        });

        gameContainer.appendChild(card);

        setTimeout(() => {
            card.classList.add('show');
        }, index * 50);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTag = button.getAttribute('data-tag');
        document.getElementById('gameType').textContent = `${selectedTag}`;
        let filteredGames;
        if (selectedTag === 'All') {
            filteredGames = games;
        } else {
            filteredGames = games.filter(game => game.tags.split(', ').includes(selectedTag));
        }
        renderGames(filteredGames);
    });
});

gameSearch.addEventListener('input', () => {
    const query = gameSearch.value.toLowerCase();
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
    renderGames(filteredGames);
});

renderGames(games);
