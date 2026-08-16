# 🌍 DOCARE – Smart Donation Management Website

A full-stack donation management platform connecting donors and receivers with real-time chat and notifications.

## 🚀 Tech Stack

- **Frontend**: HTML, TailwindCSS, JavaScript, Three.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-Time**: Socket.io
- **Auth**: JWT-based authentication

## 📦 Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
- Copy `.env.example` to `.env`
- Update MongoDB connection string if needed

3. **Start MongoDB**
```bash
# Make sure MongoDB is running on localhost:27017
```

4. **Run the Application**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

5. **Access the Application**
- Open browser: `http://localhost:5000`

## 🎯 Features

- ✅ Unified user account (donate & receive)
- ✅ Item donation with image upload
- ✅ Request management system
- ✅ Real-time chat between donor and receiver
- ✅ Live notifications
- ✅ Complete donation/receive history
- ✅ Responsive futuristic UI
- ✅ 3D animated banner

## 📁 Project Structure

```
PROJECT/
├── backend/
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth & validation
│   └── config/         # Database config
├── public/
│   ├── css/           # Styles
│   ├── js/            # Frontend JavaScript
│   ├── images/        # Static images
│   └── uploads/       # User uploads
├── views/             # HTML pages
├── server.js          # Main server file
└── package.json
```

## 🔑 Default Setup

- MongoDB: `mongodb://localhost:27017/docare`
- Server Port: `5000`
- JWT Secret: Set in `.env` file

## 📝 Usage

1. **Sign Up** - Create an account
2. **Complete Profile** - Add address and contact details
3. **Donate** - Post items you want to donate
4. **Browse** - View available donations
5. **Request** - Send requests for items you need
6. **Accept** - Donors can accept requests
7. **Chat** - Communicate in real-time
8. **Track** - View donation history

## 🛡️ Security

- Passwords hashed with bcrypt
- JWT token authentication
- Protected API routes
- Input validation

## 📧 Support

For issues or questions, please create an issue in the repository.
