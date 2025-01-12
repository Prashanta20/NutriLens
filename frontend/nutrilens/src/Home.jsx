import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function Home() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [mode, setMode] = useState("camera");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === "camera") {
            enableCamera();
        } else {
            disableCamera();
        }

        return () => {
            disableCamera();
            if (selectedFile) {
                URL.revokeObjectURL(selectedFile); // Clean up uploaded file object URL
            }
        };
    }, [mode, selectedFile]);

    const enableCamera = async () => {
        try {
            if (cameraEnabled) return;
            setCameraEnabled(true);

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch((err) => {
                        console.error("Video playback failed:", err);
                    });
                };
            }
        } catch (err) {
            console.error("Error enabling camera:", err);
        }
    };

    const disableCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraEnabled(false);
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg");
            return dataUrl;
        }
        console.error("Failed to capture image.");
        return null;
    };

    const handleAnalyze = async () => {
        console.log("Mode:", mode);
        console.log("Selected File:", selectedFile);
    
        let formData = new FormData();
    
        if (mode === "camera") {
            const imageData = captureImage(); // Capture image from the camera
            if (!imageData) {
                alert("Failed to capture image.");
                return;
            }
    
            console.log("Captured Image Data URL:", imageData);
            const blob = await fetch(imageData).then((res) => res.blob());
            formData.append("file", blob, "captured.jpg");
        } else if (mode === "upload" && selectedFile) {
            console.log("Selected File:", selectedFile.name);
            formData.append("file", selectedFile, selectedFile.name);
        } else {
            alert("Please capture an image or upload a file.");
            return;
        }
    
        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Backend Response:", data);
    
            let imageToShow;
            if (mode === "camera") {
                imageToShow = captureImage(); // Use the captured image
            } else if (mode === "upload" && selectedFile) {
                imageToShow = URL.createObjectURL(selectedFile); // Use the uploaded file
            }
    
            // Navigate to the FoodDetails page with the results
            if (imageToShow) {
                navigate("/details", {
                    state: {
                        image: imageToShow,
                        result: data, // Pass backend results
                    },
                });
            }
        } catch (err) {
            console.error("Error during analysis:", err);
            alert("An error occurred while analyzing the image.");
        }
    };
    

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>NutriLens</h1>

            <div style={{ margin: "20px 0" }}>
                <p>
                    <span style={{ marginRight: "10px", fontSize: "18px" }}>
                        {mode === "camera" ? "📷 Camera Mode" : "📂 Upload Mode"}
                    </span>
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={mode === "camera"}
                            onChange={() => setMode(mode === "camera" ? "upload" : "camera")}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            {mode === "camera" && (
                <div>
                    <video
                        ref={videoRef}
                        style={{ width: "100%", maxWidth: "500px", border: "2px solid black" }}
                    ></video>
                    <canvas ref={canvasRef} style={{ display: "none" }} width="500" height="400"></canvas>
                </div>
            )}

            {mode === "upload" && (
                <div className="file-upload-container">
                    <label htmlFor="file-upload" className="file-upload-label">
                        Choose File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="file-upload-input"
                    />
                    <span className="file-upload-filename">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                    </span>
                </div>
            )}

            <button onClick={handleAnalyze} className="analyze-button">
                Analyze
            </button>
        </div>
    );
}

export default Home;
