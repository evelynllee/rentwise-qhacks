import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the chatbot response here
        console.log(data.response);

        // Example: If you want to send the file to the chatbot
        Chatbot.sendMessage(data.response);
    })
    .catch(error => {
        console.error(error);
    });
}

Chatbot.initFull({
    chatflowid: "bf4aaf3b-7077-44a5-916c-1ca49a059b16",
    apiHost: "http://localhost:3000",
});