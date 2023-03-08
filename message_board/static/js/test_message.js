// 圖片預覽
function previewFile() {
    const preview = document.querySelector('#img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    // console.log("file", file)

    reader.addEventListener("load", function() {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

// chat
let input_text = document.querySelector('#msg')
let connect_textbox = document.querySelector('#textbox')
let socket = io();

// 成功
socket.on('connect', () => {
    console.log('connected');
    // 生成隨機暱稱
    const nickname = 'User' + Math.floor(Math.random() * 100);
    // 傳送暱稱到後端
    socket.emit('set nickname', nickname);
});

socket.on('connected clients', (count) => {
    document.getElementById('connected-count').innerHTML = count;
 });

// 斷線
socket.on('disconnect', (reason) => {
    console.log(`disconnected due to ${reason}`);
    location.href="/"
});
// 訊息
socket.on("chat message", function(data) {
    let msg = document.createTextNode(data)
    connect_textbox.appendChild(msg)
})
// 按 Enter 送出
input_text.addEventListener("keydown", function(e) {
    // console.log(e.key)
    if (e.key === "Enter") {
        let msg = input_text.value.replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;') + '\n';
        input_text.value = ""
        socket.emit("chat message", msg)
    }
})

