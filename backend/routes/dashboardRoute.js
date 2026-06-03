const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Note = require("../models/Note");

router.get("/", async (req, res) => {
    try {
        const totalStudents = await User.countDocuments();
        const totalNotes = await Note.countDocuments();
        const totalSubjects = (await Note.distinct("subject")).length;

        const notes = await Note.find();
        // ADD LOGS HERE
        console.log("Students:", totalStudents);
        console.log("Notes:", totalNotes);
        console.log("All Notes:", notes);
        const subjects = [...new Set(notes.map(note => note.subject))];

        const aiSummaries = await Note.countDocuments({
            summary: { $exists: true, $ne: "" }
        });
        res.json({
            totalStudents,
            totalNotes,
            totalSubjects: subjects.length,
            aiSummaries
        });
        console.log(
            "Current notes count:",
            await Note.countDocuments()
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;