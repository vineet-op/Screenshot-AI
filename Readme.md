# ScreenshotAI 🖼️

A modern web application that uses AI to automatically organize, categorize, and analyze your screenshots. Built with Next.js, Express.js, and powered by Google's Gemini AI.

## 🔥 Demo

[![ScreenshotAI Demo](https://img.youtube.com/vi/YOUR_YOUTUBE_VIDEO_ID/0.jpg)](https://youtu.be/YvxdTdqsT64?si=Hn_YE9GTsuOPr15n)

## ✨ Features

- **AI-Powered Analysis**: Automatically analyzes screenshots using Google Gemini AI
- **Smart Categorization**: Identifies source platforms (Reddit, Twitter, GitHub, etc.)
- **Text Extraction**: Extracts and indexes text content from images
- **Tag Generation**: Automatically generates relevant tags for easy searching
- **Cloud Storage**: Secure image storage with Cloudinary
- **User Authentication**: Secure user management with JWT tokens
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Real-time Processing**: Background image processing for better performance

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lenis** - Smooth scrolling library

### Backend

- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Google Gemini AI** - AI-powered image analysis
- **Cloudinary** - Cloud image storage and management
- **Multer** - File upload handling
- **JWT** - Authentication and authorization
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** database
- **Google Gemini API** key
- **Cloudinary** account and credentials

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ScreenshotAI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

1. **Build the Frontend**

```bash
cd frontend
npm run build
npm start
```

2. **Start the Backend**

```bash
cd backend
npm start
```

## 📁 Project Structure

```
ScreenshotAI/
├── backend/                 # Express.js API server
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middleware
│   ├── Model/              # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.js            # Server entry point
├── frontend/               # Next.js application
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility libraries
│   └── public/             # Static assets
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
