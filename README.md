# **NutriLens - Food Detection and Nutrition Analysis**

NutriLens is a web-based application that uses AI to analyze food items in images and provides detailed nutritional information. Users can interact with the app in two modes:

- **Camera Mode**: Capture an image of food using a webcam.
- **Upload Mode**: Upload an image of food from your device.

---

## **Features**

1. **Food Detection**: Uses a pre-trained YOLOv5 model to detect food items in images.
2. **Nutritional Analysis**: Fetches detailed nutrition data (calories, protein, fat, carbohydrates, etc.) for the detected food items using the Nutritionix API.
3. **Interactive Modes**:
   - **Camera Mode**: Take a photo of your food using your device's webcam.
   - **Upload Mode**: Upload a photo of your food from your device.

---

## **Contributors**

- **Developer**: Prashanta Kandel
- **Collaborators**: Harold Le, Irfan Shahid, Promish Kandel

## **Demo**

Here's how the app works:

1. Select a mode: **Camera Mode** or **Upload Mode**.
2. In **Camera Mode**, click "Analyze" to capture an image.
3. In **Upload Mode**, upload an image file and click "Analyze."
4. View the food details and nutrition analysis on the results page.

---

## **Installation and Setup**

### **Prerequisites**

Make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **Python** (version 3.8 or higher)
- **Pip** (Python package manager)

---

### **1. Clone the Repository**

```bash
git clone https://github.com/Prashanta20/nutrilens.git
cd nutrilens
```

---

### **2. Set Up the Backend**

The backend is powered by Node.js and Python (for YOLOv5).

#### **a. Install Dependencies**

Navigate to the backend directory:

```bash
cd backend
```

Install Node.js dependencies:

```bash
npm install
```

Install Python dependencies:

```bash
pip install torch torchvision flask flask-cors axios pillow
```

#### **d. Start the Backend Server**

Run the backend:

```bash
node app.js
```

The backend will run at `http://localhost:5000`.

---

### **3. Set Up the Frontend**

The frontend is powered by React.

#### **a. Install Dependencies**

Navigate to the frontend directory:

```bash
cd frontend/nutrilens
```

Install Node.js dependencies:

```bash
npm install
npm install axios
```

#### **b. Start the Frontend Development Server**

Run the frontend:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

### **4. Usage**

1. Open the frontend at `http://localhost:5173`.
2. Select a mode:
   - **Camera Mode**: Enable the camera, and click "Analyze" to capture and analyze the image.
   - **Upload Mode**: Select a file from your device, and click "Analyze."
3. View the detected food items and nutritional details on the results page.

---

## **File Structure**

### **Backend**

```
backend/
├── app.js               # Main backend server
├── package.json         # Node.js dependencies
├── package-lock.json    # Node.js dependency lock file
```

### **Frontend**

```
frontend/nutrilens/
├── src/
│   ├── App.jsx          # Main frontend component
│   ├── Home.jsx         # Home page for selecting modes
│   ├── FoodDetails.jsx  # Results page for displaying food details
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── public/              # Static assets
├── package.json         # Node.js dependencies
├── package-lock.json    # Node.js dependency lock file
```

---

## **APIs Used**

1. **Roboflow API**:
   - Used for food detection with a pre-trained YOLOv5 model.
   - [Roboflow Documentation](https://universe.roboflow.com/hamza-ic0tt/food-class/model/2)
2. **Nutritionix API**:
   - Provides nutritional information for detected food items.
   - [Nutritionix Documentation](https://developer.nutritionix.com/docs)

---

## **Troubleshooting**

1. **Backend Issues**:

   - Ensure all dependencies are installed using `npm install` and `pip install`.

2. **Frontend Issues**:

   - Ensure all Node.js dependencies are installed using `npm install`.
   - Check if the backend is running at `http://localhost:5000`.

3. **API Errors**:

   - Ensure valid API keys are set in the `.env` file. If you are using an `.env`

---

## **Future Improvements**

- Add support for multi-food detection and analysis.
- Enhance UI for better interactivity.
- Deploy the app to a cloud platform (e.g., AWS, Heroku, or Vercel).

---

---

## **License**

This project is licensed under the MIT License.
