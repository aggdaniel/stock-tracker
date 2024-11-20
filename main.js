const axios = require('axios');
const apiKey = "0C79VRGS91H215AF";
const prompt = require('prompt-sync')(); 


async function fetchStock(){
    try{
        let stock = prompt("Enter a Stock ticker symbol: ");

        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${apiKey}`);
        let info = response.data['Global Quote'];
        console.log(`\nThe Price of ${stock} is= ${info['05. price']}`);
    }catch (error) {
        console.error('Error fetching data:', error.message);
      }

}
fetchStock();