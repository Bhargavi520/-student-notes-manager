const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const Note = require('../models/Note');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const notes = await Note.find({ user: req.user.id });

        const subjects = [...new Set(notes.map(note => note.subject))];
        const ProfileData = {
            ...user.toObject(),
            stats: {
                notesUploaded: notes.length,
                subjectsCount: subjects.length,
                recentUploads: notes.filter(note => {
                    const today = new Date();
                    const noteDate = new Date(note.createdAt);

                    const diff = (today - noteDate) / (1000 * 60 * 60 * 24);
                    return diff <= 7;
                }).length,
                aiSummaries: notes.filter(
                    note => note.summary
                ).length
            }
        };
        res.json(ProfileData);
        //  stats: {
        // notesUploaded: 5,
        // subjectsCount: 3,
        // recentUploads: 2,
        // aiSummaries: 1
        // }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error fetching profile"
        });
    }
})

router.put('/', authMiddleware, async (req, res) => {
    try {
        const { name, bio, college, branch } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error updating profile"
        });
    }
});

module.exports = router;