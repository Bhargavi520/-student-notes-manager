const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    tags: { type: [String], required: true },
    fileUrl: { type: String, required: true },
    originalFileName: {
        type: String
    },
    summary: {
        type: String,
        default: ""
    },
    // Now every note belongs to a user.
    user: {
        // it will store the id of the user who created the note, 
        // and it will reference the User model, 
        // which means that we can populate(give) the user details when we retrieve the notes.
        // user:req.user.id, this is how we will get the user id from the request, and then we will store it in the user field of the note, so that we can later retrieve the notes of a specific user by querying the notes collection with the user id.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
    // timestamps:true-  MongoDB automatically adds:createdAt && updatedAt
});

module.exports = mongoose.model('Note', noteSchema);