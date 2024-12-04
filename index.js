"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    
    try {
        // Ensure the service worker is registered before proceeding
        await registerSW();
    } catch (err) {
        error.textContent = "Failed to register service worker.";
        errorCode.textContent = err.toString();
        throw err;
    }

    // Get the values from the form fields
    const query = address.value.trim();  // Ensure the query is trimmed
    const searchEngineUrl = searchEngine.value.trim();

    // Ensure there is a valid search engine URL
    if (!query || !searchEngineUrl) {
        error.textContent = "Search query or search engine URL is missing.";
        return;
    }

    // Perform the search using the values
    const url = search(query, searchEngineUrl);
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
