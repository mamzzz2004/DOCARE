# 🌍 DOCARE - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** (optional) - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open your terminal in the PROJECT directory and run:

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- socket.io
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- multer
- cookie-parser

### Step 2: Configure Environment

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. The `.env` file should contain:
   ```
   MONGODB_URI=mongodb://localhost:27017/docare
   JWT_SECRET=docare_secret_key_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

   **Note:** For production, change the `JWT_SECRET` to a strong random string.

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# MongoDB should be running as a service
# Or start it manually:
mongod
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or
brew services start mongodb-community
```

### Step 4: Run the Application

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
PROJECT/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── donationController.js
│   │   ├── requestController.js
│   │   ├── chatController.js
│   │   ├── notificationController.js
│   │   └── historyController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── upload.js            # File upload handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Donation.js
│   │   ├── Request.js
│   │   ├── Chat.js
│   │   ├── Notification.js
│   │   └── History.js
│   └── routes/
│       ├── authRoutes.js
│       ├── donationRoutes.js
│       ├── requestRoutes.js
│       ├── chatRoutes.js
│       ├── notificationRoutes.js
│       └── historyRoutes.js
├── public/
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   ├── auth.js              # Authentication utilities
│   │   ├── socket-client.js     # Socket.io client
│   │   └── three-animation.js   # 3D animations
│   └── uploads/                 # User uploaded images
├── views/
│   ├── index.html               # Landing page
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── donate.html
│   ├── donations.html
│   ├── donation-detail.html
│   ├── requests.html
│   ├── chat.html
│   ├── notifications.html
│   ├── history.html
│   └── profile.html
├── server.js                    # Main server file
├── package.json
└── README.md
```

## 🎯 Features Implemented

### ✅ User Management
- User registration with email, password, address, and contact
- JWT-based authentication
- Profile management
- Secure password hashing with bcrypt

### ✅ Donation System
- Post donations with image upload
- Browse available donations
- View detailed donation information
- See donor contact details
- Category and search filters

### ✅ Request Management
- Send requests for donations
- Specify quantity, urgency, and reason
- Donor can accept/decline requests
- Only one request can be accepted per donation
- Auto-decline other requests when one is accepted

### ✅ Real-Time Chat
- Socket.io powered instant messaging
- Chat opens automatically when request is accepted
- Persistent chat history
- Typing indicators
- Message timestamps

### ✅ Notifications
- Real-time notifications for:
  - New donation requests
  - Request accepted/declined
  - New chat messages
- Browser notifications support
- Unread notification badge
- Mark as read functionality

### ✅ History Tracking
- Complete donation history
- Received items history
- View donor/receiver details
- Access to chat from history
- Statistics dashboard

### ✅ UI/UX Features
- Futuristic design with TailwindCSS
- Three.js 3D animated hero section
- Fully responsive layout
- Light blue, white, and green color theme
- Smooth animations and transitions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Donations
- `POST /api/donations` - Create donation (with image)
- `GET /api/donations` - Get all donations
- `GET /api/donations/my-donations` - Get user's donations
- `GET /api/donations/:id` - Get donation by ID
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Requests
- `POST /api/requests` - Create request
- `GET /api/requests/my-requests` - Get user's requests
- `GET /api/requests/donation/:donationId` - Get requests for donation
- `PUT /api/requests/:id/accept` - Accept request
- `PUT /api/requests/:id/decline` - Decline request

### Chat
- `GET /api/chat/active` - Get active chats
- `GET /api/chat/:donationId` - Get chat messages
- `POST /api/chat` - Send message

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### History
- `GET /api/history` - Get user history
- `GET /api/history/stats` - Get statistics

## 🔌 Socket.io Events

### Client → Server
- `join` - User joins with their ID
- `send_message` - Send chat message
- `typing` - Typing indicator

### Server → Client
- `new_request` - New donation request received
- `request_accepted` - Request was accepted
- `request_declined` - Request was declined
- `new_message` - New chat message
- `receive_message` - Real-time message delivery
- `user_typing` - Other user is typing

## 🎨 Color Scheme

- **Primary Blue:** `#3b82f6`
- **Secondary Green:** `#10b981`
- **Accent Cyan:** `#06b6d4`
- **Dark:** `#1e293b`
- **Light:** `#f8fafc`
- **Gray:** `#64748b`

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- HTTP-only cookies
- Protected API routes
- Input validation
- File upload restrictions (images only, 5MB max)

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB Connection Error
```
**Solution:** Ensure MongoDB is running on `localhost:27017`

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change the PORT in `.env` file or kill the process using port 5000

### Image Upload Not Working
```
Error: Image upload failed
```
**Solution:** Ensure the `public/uploads/` directory exists and has write permissions

### Socket.io Not Connecting
```
Error: Socket connection failed
```
**Solution:** Check if the server is running and the URL in `socket-client.js` matches your server URL

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

**Note:** For best experience, use a modern browser with WebSocket support.

## 🚀 Deployment Tips

### For Production:

1. **Change JWT Secret:**
   ```
   JWT_SECRET=your_very_long_random_secret_key_here
   ```

2. **Use Production MongoDB:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docare
   ```

3. **Set NODE_ENV:**
   ```
   NODE_ENV=production
   ```

4. **Enable HTTPS**
5. **Set up proper CORS**
6. **Use environment variables for sensitive data**
7. **Enable rate limiting**
8. **Set up logging**

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check MongoDB and Node.js logs
4. Ensure all dependencies are installed

## 🎉 Success!

If everything is set up correctly, you should see:
```
✅ MongoDB Connected: localhost
📊 Database: docare
🚀 Server running on port 5000
🌐 Visit: http://localhost:5000
📡 Socket.io ready for real-time communication
```

Happy coding! 🌍💚
