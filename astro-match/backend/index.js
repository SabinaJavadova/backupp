// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const userRoutes = require("./routes/userRouer");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messajeRoutes = require("./routes/messajeRoutes");

dotenv.config(); // Enviroment faylını oxuyuruq
const app = express();
const server = http.createServer(app); // HTTP server yaratmaq

const io = socketIo(server); // Socket.IO serverini yaratmaq

const corsOptions = {
  origin: "http://localhost:5173", // Frontend serverinin URL-i
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// app.use("/api/messages", messageRoutes); // Mesaj API-larını buraya əlavə edirik
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/chat", chatRoutes);
app.use("/messajes", messajeRoutes);
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

// Backend logic for creating a chat
app.post("/chat", async (req, res) => {
  const { firstId, secondId } = req.body;

  // Validate IDs
  if (!firstId || !secondId) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }

  try {
    // Create chat
    const chat = await chat.create({ members: [firstId, secondId] });
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
});
// Serveri başlatırıq
server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
