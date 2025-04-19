window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const link = urlParams.get('link');

    if (name) {
        document.getElementById('title').textContent = name;
    }

    if (link) {
        document.getElementById('game-frame').src = link;
    }
};