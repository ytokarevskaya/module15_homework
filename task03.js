const sendButton = document.querySelector(".task-03-sndBtn");
const sendGeo = document.querySelector(".task-03-sndGeo");
const chat = document.querySelector(".task-03-chat");

function writeToScreen(message, textPosition, marginValue) {
    let pre = document.createElement("div");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    pre.style.maxWidth = "300px";
    pre.style.padding = "10px";
    pre.style.textAlign = textPosition;
    pre.style.border = "solid 2px lightblue";
    pre.style.borderRadius = "1px";
    if (marginValue === "left") {
        pre.style.marginLeft = "300px";
        pre.style.marginRight = "10px";
    } else {
        pre.style.marginLeft = "10px";
        pre.style.marginRight = "300px";
    }
    chat.appendChild(pre);
}

sendButton.addEventListener("click", () => {
    let webSocket = new WebSocket("wss://echo.websocket.org/");
    let inputText = document.querySelector("input").value;
    writeToScreen(inputText, "right", "left");
    webSocket.onopen = () => {
        webSocket.send(inputText);
    }
    webSocket.onmessage = async function (evt) {
        writeToScreen(evt.data, "left", "right");
        await webSocket.close();
    }
})

sendGeo.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position => {
            const { coords } = position;
            console.log(coords)
            let geoString = "https://www.openstreetmap.org/#map=13/" + coords.latitude + "/" + coords.longitude;
            let webSocket = new WebSocket("wss://echo.websocket.org/");
            writeToScreen(geoString, "right", "left");
            webSocket.onopen = async () => {
                webSocket.send(geoString);
                await webSocket.close();
            }
        }))
    } else {
        alert("Включите геолокацию!")
    }
})