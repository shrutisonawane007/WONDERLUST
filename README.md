# Wanderlust 🌍
**A Full-Stack Travel & Stay Marketplace**

Wanderlust is a comprehensive web application inspired by Airbnb, designed to connect travelers with unique stays around the world. Users can browse listings, post their own properties, leave reviews, and view locations on an interactive map.

---

## 🚀 Project Overview
This project is built using the **MERN Stack** (MongoDB, Express.js, React/EJS, Node.js) and follows the **MVC (Model-View-Controller)** design pattern for clean, modular, and maintainable code.

## 🛠️ Technology Stack

### **Frontend & Backend**
* **Node.js & Express.js:** Powering the server-side logic and RESTful API routes.
* **EJS :** Used for rendering dynamic, responsive user interfaces.
* **Bootstrap 5:** For a modern, mobile-first styling and layout.
* **Passport.js:** Handles secure user authentication and authorization.

### **Cloud Storage & Database**
* **MongoDB Atlas:** I used Atlas as our primary cloud database, ensuring that all user data, listings, and reviews are stored securely in a scalable NoSQL environment.
* **Cloudinary:** To handle high-quality image uploads. Instead of storing images on the local server, they are hosted on Cloudinary to ensure fast loading speeds and reliable storage.

### **Maps & Geocoding**
* **Mapbox API:** Integrated to provide interactive map functionality. 
    * **Geocoding:** Automatically converts address strings into geographic coordinates.
    * **Interactive Markers:** Displays the exact location of every property listing on a map.

---

## 🔑 Security & Environment Variables
Security is a top priority for this project. All sensitive information is managed via a **.env** file, which is excluded from version control using `.gitignore`.

This file secures:
* **Database Credentials:** MongoDB Atlas connection strings.
* **Cloudinary API Keys:** For managing image uploads.
* **Mapbox Access Tokens:** For rendering maps.
* **Session Secrets:** To protect user sessions and cookies.

---


**✨ CORE FEATURES**
* **Full CRUD:** Users can Create, Read, Update, and Delete hotel listings.
* **Authentication:** Secure Sign-up and Login using Passport.js.
* **Authorization:** Secure permissions so only the owner can Edit or Delete their listings.
* **Review System:** Users can leave star ratings and feedback for each stay.
* **Fully Responsive:** The design works perfectly on Mobile, Tablet, and Desktop.

## ⚙️ Local Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/wanderlust.git](https://github.com/your-username/wanderlust.git)
   cd wanderlust
2.**Install dependencies**
npm install

3.**Setup Environment Variables (.env)**

* **ATLASDB_URL**=your_mongodb_atlas_link
* **CLOUD_NAME**=your_cloudinary_name
* **CLOUD_API_KEY**=your_api_key
* **CLOUD_API_SECRET**=your_api_secret
* **MAP_TOKEN**=your_mapbox_public_token
* **SECRET**=mysupersecretcode

4.**To start the project**
node app.js



