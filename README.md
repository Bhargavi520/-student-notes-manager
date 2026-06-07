# 📚 Student Notes Manager (MERN Stack)

A full-stack **Student Notes Management System** where users can upload, manage, and organize study materials like PDFs, PPTs, and images with AI-powered summaries.

---

🚀 Live Demo
🌐 Frontend: https://student-notes-manager-silk.vercel.app
⚙️ Backend: https://student-notes-manager-1.onrender.com/api/stats/
---

## 📸 Project Preview





---

## ✨ Features

### 🔐 Authentication
- User Signup & Login (JWT based authentication)
- Protected routes

### 📂 Notes Management
- Upload notes (PDF, PPT, Images)
- View uploaded files in browser
- Edit & Delete notes
- Tag-based organization

### ☁️ Cloud Storage
- Cloudinary integration for file uploads
- Supports:
  - PDF (opens in browser)
  - PPT/PPTX (opens via Office Viewer)
  - Images

### 🤖 AI Features
- AI-powered note summary generation (OpenAI / OpenRouter)
- Saves summaries per note

### 👤 User Profile
- User details (name, email, college, branch)
- Statistics:
  - Total notes uploaded
  - AI summaries generated
  - Subjects tracked

### 📊 Dashboard
- Displays all notes
- Filter & organize notes
- Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer
- Cloudinary SDK
- OpenAI / OpenRouter API

---

## 📁 Project Structure

student-mang/
│
├── backend/
│ ├── config/
│ │ └── cloudinary.js
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│

⚙️ Installation Guide

1. Clone Repository
git clone https://github.com/Bhargavi520/-student-notes-manager
cd student-notes-manager
2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_openai_or_openrouter_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Run backend:
npm start

3. Frontend Setup
   
cd frontend
npm install
npm run dev

🌐 Deployment
  |__Part______|___Platform_______|
  |  Frontend	 |   Vercel         |
  |  Backend	 |   Render         |
  |  Database	 |   MongoDB Atlas  |
  |  Storage	 |   Cloudinary     |
  
📌 Important Notes
   PDF files open directly in browser
   PPT/PPTX files use Microsoft Office Viewer
   Files stored in Cloudinary
   JWT stored in localStorage
   Never use localhost in production
🚀 Future Improvements
    Google OAuth login
    Advanced search & filters
    Folder-based organization
    Mobile app version
    Better AI summarization

👨‍💻 Author
Bhargavi

GitHub: https://github.com/Bhargavi520
LinkedIn: https://www.linkedin.com/in/bhargavi-dasari-38b293335/

⭐ Support

If you like this project, please ⭐ the repository.


