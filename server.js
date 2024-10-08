const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
const port = 3000;

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve HTML and handle file uploads
app.use(express.static('public'));

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Use Axios to communicate with the Flowise Chatbot API
        const response = await axios.post('http://localhost:3000/flowise-api', {
            file: req.file.buffer.toString('base64'), // Convert the file to base64
            // Add any other relevant data or parameters
        });

        // Return the chatbot response to the client
        res.json({ response: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});