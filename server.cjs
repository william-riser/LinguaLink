const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.VITE_API_KEY)

app.post('/gemini', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    try {
        const chat = model.startChat({ history: req.body.history });
        const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        if (!text) { 
            // Handle case where 'text' property doesn't exist
            console.error("No 'text' property found in response:", response); 
            res.send("Sorry, I'm having trouble understanding the response. Please try again.");
            return; 
        }
        res.send(text);
    } catch (error) {
        console.error('Error in Gemini request:', error);
        res.status(500).send('Server Error');
    }
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))