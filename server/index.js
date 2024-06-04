const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());

app.post("/chatbot", async (req, res) => {
    try {
      const { text } = req.body;
  
      // Make a request to the Unsplash API to search for images based on the text input
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: text,
          per_page: 1, // Limit to one image for simplicity
          client_id: "alaqvqpsbpHkYC9HMi-10cdy2jcxRgSvaJJotZpRqQo",
        }
      });
  
      if (response.data.results.length > 0) {
        res.send(response.data.results[0].urls.regular);
      } else {
        res.status(404).send("No image found for the given text.");
      }
    } catch (error) {
      console.error("Error processing request", error.response ? error.response.data : error.message);
      res.status(500).send("An error occurred while processing your request.");
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
