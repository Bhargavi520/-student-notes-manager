# 📚 Student Notes Manager (MERN Stack)

A full-stack **Student Notes Management System** where users can upload, manage, and organize study materials like PDFs, PPTs, and images with AI-powered summaries.

---

🚀 Live Demo
🌐 Frontend: https://student-notes-manager-silk.vercel.app
⚙️ Backend: https://student-notes-manager-1.onrender.com/api/stats/
---

## 📸 Project Preview
DASHBOARD 
![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/01.png)

FEATURES
![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/02.png)

UPLOADED NOTES

![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/03.png)

NOTES
![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/04.png)

SEARCH

![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/05.png)

PROFILE

![image alt](https://github.com/Bhargavi520/-student-notes-manager/blob/15159394e36e8a6714438b40e0f46c60f6b1a95e/06.png)



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


