require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./backend/config/database');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Make io accessible to routes
app.set('io', io);

// Socket.io connection handling
const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  // User joins with their ID
  socket.on('join', (userId) => {
    socket.join(userId);
    userSockets.set(userId, socket.id);
    console.log(`👤 User ${userId} joined`);
  });

  // Handle chat messages
  socket.on('send_message', (data) => {
    const { receiverId, message } = data;
    io.to(receiverId).emit('receive_message', message);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const { receiverId, isTyping } = data;
    io.to(receiverId).emit('user_typing', { isTyping });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    // Remove from userSockets map
    for (let [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

// API Routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/donations', require('./backend/routes/donationRoutes'));
app.use('/api/requests', require('./backend/routes/requestRoutes'));
app.use('/api/chat', require('./backend/routes/chatRoutes'));
app.use('/api/notifications', require('./backend/routes/notificationRoutes'));
app.use('/api/history', require('./backend/routes/historyRoutes'));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'forgot-password.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'donate.html'));
});

app.get('/donations', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'donations.html'));
});

app.get('/donation/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'donation-detail.html'));
});

app.get('/requests', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'requests.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

app.get('/notifications', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'notifications.html'));
});

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'history.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`📡 Socket.io ready for real-time communication\n`);
});
