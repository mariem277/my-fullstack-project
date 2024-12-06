# Data Detective

**Project Description:**  
Data Detective is a solution built with a **Node.js** backend and a **React** frontend that collects and visualizes user interaction data. It tracks the usage of different features by users, stores this data in a **public MongoDB Atlas** database, and provides statistical insights such as the number of times each feature is used and user interaction patterns. 

This project provides an intuitive interface to visualize the data through interactive charts and statistics, helping users analyze behavior patterns and feature usage.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [License](#license)

---

## Installation

To run this project locally, you'll need to install dependencies for both the backend and frontend.

### Backend (Node.js)

1. Clone the repository:
    ```bash
    git clone https://github.com/mariem277/my-fullstack-project.git
    ```

2. Navigate to the `data-detective` folder (backend):
    ```bash
    cd data-detective
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory with the following variables:
    ```bash
    MONGODB_URI=your_mongodb_atlas_connection_string
    PORT=your_preferred_port (e.g., 3000)
    ```

   **Note:** The project uses a **public MongoDB Atlas** database to store user interaction data. If you'd like to use a local MongoDB instance, you can replace the `MONGODB_URI` with your local database URI.

5. Start the backend server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:3000` by default.

---

### Frontend (React)

1. Navigate to the `stats-frontend` folder:
    ```bash
    cd stats-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

The frontend will run on `http://localhost:3001` by default.

---

## Usage

Once the backend and frontend are set up:

1. The frontend will display interactive charts and graphs that show:
   - Feature usage statistics.
   - User interaction statistics.

2. The backend provides two key endpoints:
   - `POST /user-interaction`: To submit user interaction data.
   - `GET /stats/feature-usage`: To get the number of interactions for each feature.
   - `GET /stats/user-interactions`: To get the number of interactions for each user.

---

## API Endpoints

### POST /user-interaction

This endpoint accepts user interaction data.

#### Request Body:
```json
{
  "userId": "user137",
  "featureUsed": "Feature D",
  "timestamp": "2024-12-05T14:15:00Z",
  "metadata": {
    "device": "Android 11",
    "browser": "Firefox"
  }
}
