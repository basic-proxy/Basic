document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const link = urlParams.get('link');
    const type = urlParams.get('type');
    
    const backLink = type === "app" ? "apps.html" : "games.html";
    document.getElementById('back-link').href = backLink;

    if (name && document.getElementById('title')) {
        document.getElementById('title').textContent = name;
    }

    if (link && document.getElementById('main-frame')) {
        if (type === "app") {
            const uvUrl = __uv$config.prefix + __uv$config.encodeUrl(link);
            document.getElementById('main-frame').src = uvUrl;
            document.getElementById('uv-form').style.display = 'none';
        } else {
            document.getElementById('main-frame').src = link;
        }
    }
});