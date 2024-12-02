let inFrame;

try {
    inFrame = window !== top;
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
const { name, icon, redirectLocation } = cloakConfig[cloak] || defaultConfig;

if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
        alert("Allow popups and reload to cloak this link.");
    } else {
        const doc = popup.document;
        const iframe = doc.createElement("iframe");
        const link = doc.createElement("link");

        doc.title = name;
        link.rel = "icon";
        link.href = icon;

        iframe.src = location.href;
        Object.assign(iframe.style, {
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            border: "none",
            outline: "none",
            width: "100%",
            height: "100%"
        });

        doc.head.appendChild(link);
        doc.body.appendChild(iframe);
        location.replace(redirectLocation);
    }
}
