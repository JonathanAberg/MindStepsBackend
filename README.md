# MindSteps Backend

Backend API for the **MindSteps** mobile app.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/MindStepsBackend.git
cd MindStepsBackend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your-mongo-uri-here
PORT=3000
```

* `MONGODB_URI` → MongoDB Atlas connection string
* `PORT` → optional (defaults to 3000)

### 4. Start the server

```bash
npm run dev
```

Expected output:

```
✅ Connected to MongoDB Atlas
🚀 Server running on http://localhost:3000
```

---

## 📡 API Endpoints

### Health Check

```http
GET /health
```

### Create a Session

```http
POST /session
Content-Type: application/json

{
  "steps": 123,
  "answer": "Bra",
  "date": "2025-08-20T12:00:00Z"
}
```

### List Sessions

```http
GET /session
```

**Response**

```json
[
  {
    "_id": "66c3f9c8e4d4",
    "steps": 123,
    "answer": "Bra",
    "date": "2025-08-20T12:00:00Z"
  }
]
```

---

## 🔗 Frontend Integration

* **Android Emulator**: use

  ```
  http://10.0.2.2:3000
  ```
* **Expo Go on real phone**: use

  ```
  http://<your-PC-LAN-IP>:3000
  ```
