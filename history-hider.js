let inFrame;

try {
    inFrame = window.self !== window.top;
} catch (e) {
    inFrame = true;
}

const defaultConfig = {
    name: "Home - Google Drive",
    icon: "images/favicons/drive.ico",
    redirectLocation: "https://drive.google.com/drive/"
};

const cloakConfig = {
    "GoogleDrive": {
        name: "Home - Google Drive",
        icon: "images/favicons/drive.ico",
        redirectLocation: "https://drive.google.com/drive/"
    },
    "Outlook": {
        name: "Mail - Outlook",
        icon: "images/favicons/outlook.ico",
        redirectLocation: "https://outlook.office.com/mail/"
    },
    "Google": {
        name: "Google",
        icon: "images/favicons/google.ico",
        redirectLocation: "https://google.com"
    },
    "Blooket": {
        name: "Blooket",
        icon: "images/favicons/blooket.ico",
        redirectLocation: "https://play.blooket.com/play"
    },
    "Desmos": {
        name: "Desmos | Graphing Calculator",
        icon: "images/favicons/desmos.ico",
        redirectLocation: "https://www.desmos.com/calculator"
    }
};

const cloak = localStorage.getItem('cloak');
const config = cloakConfig[cloak] || defaultConfig;

if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = window.open("about:blank", "_blank");
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert("Please enable popups and reload to use the history cloaker.");
    } else {
        popup.document.title = config.name;

        const link = popup.document.createElement("link");
        link.rel = "icon";
        link.href = config.icon;
        popup.document.head.appendChild(link);

        const iframe = popup.document.createElement("iframe");
        Object.assign(iframe.style, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none"
        });
        iframe.src = window.location.href;

        popup.document.body.style.margin = "0";
        popup.document.body.style.padding = "0";
        popup.document.body.appendChild(iframe);

        window.location.href = config.redirectLocation;
    }
}
