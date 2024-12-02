// Get the modal and its elements
const modal = document.querySelector('.relative.z-10');
const backdrop = modal.querySelector('.fixed.inset-0.bg-gray-500.bg-opacity-75');
const modalPanel = modal.querySelector('.relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl');

// Function to show the modal with the game details
function showModal(name, tags, description, gameLink, imgSrc) {
    // Get the modal elements
    const modal = document.getElementById('gameModal');
    const modalPanel = document.getElementById('modalPanel');
    const backdrop = modal.querySelector('.fixed.inset-0.bg-gray-500');

    // Update modal content
    document.getElementById('gameTitle').textContent = name;
    document.getElementById('gameTags').textContent = tags.join(', '); // Assuming tags is an array
    document.getElementById('gameDescription').textContent = description;
    document.getElementById('gameImg').src = imgSrc;
    document.getElementById('gameLink').href = gameLink;

    // Show the modal
    modal.classList.remove('hidden');
    backdrop.classList.add('ease-out', 'duration-300');
    backdrop.classList.remove('opacity-0');
    modalPanel.classList.add('ease-out', 'duration-300');
    modalPanel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
}

// Function to close the modal
document.getElementById('closeModalBtn').addEventListener('click', function() {
    const modal = document.getElementById('gameModal');
    modal.classList.add('hidden');
});

// Example usage inside your game loop
games.forEach(game => {
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
    `;

    // Attach a click event handler to the info button
    card.querySelector('.info-button').addEventListener('click', (event) => {
        event.stopPropagation(); // Stop the card click from firing
        event.preventDefault();  // Prevent the anchor from navigating
        showModal(game.name, game.tags, game.description, game.gameLink, game.imgSrc); // Show the modal with game info
    });

    // Add the card to the container
    gameContainer.appendChild(card);
});


// Function to hide the modal
function hideModal() {
  backdrop.classList.add('ease-in', 'duration-200');
  backdrop.classList.remove('opacity-100');
  modalPanel.classList.add('ease-in', 'duration-200');
  modalPanel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
  modalPanel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 200);
}

// Add event listeners to the buttons
document.querySelector('.inline-flex.w-full.justify-center.rounded-md').addEventListener('click', () => {
  // Deactivate account logic here
  hideModal();
});
document.querySelector('.mt-3.inline-flex.w-full.justify-center.rounded-md.bg-white').addEventListener('click', hideModal);

// Show the modal on page load (optional)
showModal();