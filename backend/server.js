const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
// cors is used to allow cross-origin requests, which is necessary when the frontend and backend are hosted on different domains or ports.
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
const noteRoute=require('./routes/noteRoute');//what does it call ? it calls the noteRoute which is defined in the routes/noteRoute.js file, and it contains the API endpoints for handling notes related operations such as creating a new note, retrieving notes, etc.
// what api endpoints ? the API endpoints are defined in the noteRoute.js file, and they include POST /api/notes to create a new note, GET /api/notes to retrieve all notes, GET /api/notes/:id to retrieve a specific note by id, PUT /api/notes/:id to update a note by id, and DELETE /api/notes/:id to delete a note by id.

const authRoute=require('./routes/authRoute')
const aiRoute=require('./routes/aiRoute')
const profileRoute=require('./routes/profileRoute')
const dashboardRoute = require("./routes/dashboardRoute");



app.use(cors());
// it sends req.body as json to the server
app.use(express.json());
//connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/studentDB').then(()=>{
    console.log("connected to the database");
}).catch((err)=>{
    console.error("Database connection error:", err);
});



app.use('/api/ai',aiRoute);
app.use('/api/notes', noteRoute);

// app.use('/uploads',express.static('uploads'));
// This line serves static files from the 'uploads' directory, allowing clients to access uploaded files via the /uploads route.
//  For example, if a file is uploaded and saved in the 'uploads' directory, it can be accessed at http://localhost:5000/uploads/filename.ext.

app.use('/api/auth',authRoute);
app.use('/api/profile',profileRoute);
app.use("/api/stats", dashboardRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})