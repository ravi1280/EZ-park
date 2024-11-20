const ws = new WebSocket('ws://flameguard.loca.lt/FlameGuard/Home_WebSocket');

const keepAlive = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send('ping');
    }
}, 29000);

ws.onopen = () => {
    ws.send('open connection (react-native)');
    keepAlive;
};

ws.onmessage = e => {
    console.log(e.data);
};

ws.onerror = e => {
    console.log(e.message);
}; 

ws.onclose = e => {
    console.log(e.code, e.reason);
    clearInterval(keepAlive);
};