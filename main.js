const express = require('express');
const axios = require('axios'); 
const cors = require('cors');

const apiKey = "0C79VRGS91H215AF"; 
const app = express(); 

app.use(cors({
    origin: 'https://amayadaniel.netlify.app',
}));


const PORT = process.env.PORT || 3000;

app.get('/stock', async (req, res) => {
    const stock = req.query.ticker; 

    if (!stock) {
        return res.status(400).json({ message: 'Stock ticker symbol is required' });
    }

    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${apiKey}`);
        const info = response.data['Global Quote'];

        if (!info || !info['05. price']) {
            return res.status(404).json({ message: 'Stock ticker not found or invalid' });
        }

        res.json({
            ticker: stock.toUpperCase(),
            price: info['05. price'],
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);

        res.status(500).json({ message: 'Error fetching stock price' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
