import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FoodDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, result } = location.state || {};

    console.log("Received Props:", { image, result });

    // Gracefully handle invalid result
    if (!result || !result.info || !result.info.foods || result.info.foods.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Error</h1>
                <p>No food information available. Please go back and try again.</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        );
    }

    // Extract food information
    const food = result.info.foods[0];

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Food Details</h1>

            {/* Display the image */}
            {image && (
                <img
                    src={image}
                    alt="Analyzed Food"
                    style={{ width: "300px", marginBottom: "20px", border: "2px solid black" }}
                />
            )}

            {/* Display the food name */}
            <h2 style={{ fontSize: "24px", margin: "20px 0" }}>{food.food_name}</h2>

            {/* Display food details */}
            <div style={{ textAlign: "left", display: "inline-block" }}>
                <p><strong>Serving Quantity:</strong> {food.serving_qty}</p>
                <p><strong>Serving Unit:</strong> {food.serving_unit}</p>
                <p><strong>Serving Weight (grams):</strong> {food.serving_weight_grams}</p>
                <p><strong>Calories:</strong> {food.nf_calories}</p>
                <p><strong>Total Fat:</strong> {food.nf_total_fat} g</p>
                <p><strong>Protein:</strong> {food.nf_protein} g</p>
                <p><strong>Total Carbohydrates:</strong> {food.nf_total_carbohydrate} g</p>
            </div>

            {/* Back button */}
            <button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
                Back to Home
            </button>
        </div>
    );
}

export default FoodDetails;
