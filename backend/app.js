const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

require('dotenv').config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nutritionix API credentials
const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY;

// RoboFLow API Key
const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;

app.post("/analyze", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Convert image to Base64
        const imageBase64 = fs.readFileSync(filePath, { encoding: "base64" });

        // Call Roboflow API
        const roboflowResponse = await axios.post(
            "https://detect.roboflow.com/food-class/2",
            imageBase64,
            {
                params: { api_key: ROBOFLOW_API_KEY }, // Replace with your actual API key
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        // Get detected food classes
        const predictions = roboflowResponse.data.predictions;
        if (!predictions || predictions.length === 0) {
            return res.json({ error: "No food detected." });
        }

        // Fetch nutritional information for the top prediction
        const topFood = predictions[0].class; // Use the most confident detection
        const nutritionixResponse = await axios.post(
            "https://trackapi.nutritionix.com/v2/natural/nutrients",
            { query: topFood },
            {
                headers: {
                    "x-app-id": NUTRITIONIX_APP_ID,
                    "x-app-key": NUTRITIONIX_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        // Send combined response
        res.json({
            info: nutritionixResponse.data,
            predictions: predictions,
        });
    } catch (error) {
        console.error("Error analyzing image:", error);
        res.status(500).json({ error: "Failed to analyze image." });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
