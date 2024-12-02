function scrollTags(direction) {
    const tagsContainer = document.querySelector('.game-tag-group-wrapper');
    const scrollAmount = 200; // Adjust this value to control the scroll distance

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
