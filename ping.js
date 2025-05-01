const startTime = performance.now();

window.onload = function () {
    const endTime = performance.now();
    const renderTime = (endTime - startTime).toFixed(2);
    document.getElementById('renderTime').textContent = `${renderTime} milliseconds.`;
    runPingTest();
};

async function measurePing(url) {
    const startTime = performance.now();
    try {
        await fetch(url, { method: 'HEAD', cache: 'no-store' });
        return Math.round(performance.now() - startTime);
    } catch {
        return null;
    }
}

function updatePingColor(element, ping) {
    if (ping > 150) {
        element.style.color = 'red';
    } else if (ping > 100) {
        element.style.color = 'orange';
    } else {
        element.style.color = 'green';
    }
}

async function runPingTest() {
    const ping = await measurePing('https://api.psgl.cl/');
    const pingDisplay = document.getElementById('ping');

    if (ping !== null) {
        pingDisplay.textContent = `${ping} ms`;
        updatePingColor(pingDisplay, ping);
    } else {
        pingDisplay.textContent = 'Server not reachable';
        pingDisplay.style.color = 'gray';
    }
}

async function displayPing() {
    const serverPing = await measurePing(window.location.origin);
    const proxyPing = await measurePing('https://api.psgl.cl/');

    const serverPingElement = document.getElementById('server-ping');
    const proxyPingElement = document.getElementById('proxy-ping');

    serverPingElement.textContent = serverPing !== null ? `${serverPing} ms` : 'Error';
    proxyPingElement.textContent = proxyPing !== null ? `${proxyPing} ms` : 'Error';

    if (serverPing !== null) updatePingColor(serverPingElement, serverPing);
    if (proxyPing !== null) updatePingColor(proxyPingElement, proxyPing);
}

function displayNetworkInfo() {
    const strengthElement = document.getElementById('network-strength');
    const ssidElement = document.getElementById('ssid');

    if (navigator.connection) {
        const { effectiveType, downlink, rtt } = navigator.connection;
        strengthElement.textContent = `Type: ${effectiveType}, Downlink: ${downlink} Mbps, RTT: ${rtt} ms`;
    } else {
        strengthElement.textContent = 'Network info not supported on this browser.';
    }

    navigator.permissions?.query({ name: 'wifi' }).then(result => {
        if (result.state === 'granted') {
            ssidElement.textContent = 'Not supported in this browser.';
        } else {
            ssidElement.textContent = 'Permission not granted.';
        }
    }).catch(() => {
        ssidElement.textContent = 'Unable to fetch :(';
    });
}

function startUpdating() {
    displayNetworkInfo();
    setInterval(() => {
        displayPing();
        displayNetworkInfo();
    }, 1000);
}

startUpdating();
