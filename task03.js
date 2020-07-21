let websocket;
const sendButton = document.querySelector(".send_button");
const sendGeo = document.querySelector(".send_geo");
const output = document.getElementById("output");

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "word-wrap";
    pre.innerHTML = message;
    output.before(pre);
}

sendButton.addEventListener("click", () => {
    let webSocket = new WebSocket("wss://echo.websocket.org/");
    let inputText = document.getElementById("input_text").value;
    writeToScreen(
        '<span style="color: red;">' + inputText + '</span>'
    );
    webSocket.onopen = () => {
        webSocket.send(inputText);
    }
    webSocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">' + evt.data + '</span><br>'
        )
    }
})