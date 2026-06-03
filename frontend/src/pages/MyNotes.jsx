import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function MyNotes() {
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editTags, setEditTags] = useState("");
    const [summaries, setSummaries] = useState({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/notes",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const summaryMap={};
            response.data.forEach(note=>{
                if(note.summary){
                    summaryMap[note._id]=note.summary;
                }
            });
            setSummaries(summaryMap)
            setNotes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/notes/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setNotes(notes.filter((note) => note._id !== id));

            toast.success("Note deleted");
        } catch (err) {
            console.log(err);
            toast.error("Error deleting note");
        }
    };

    const startEditing = (note) => {
        setEditingId(note._id);
        setEditTitle(note.title);
        setEditDescription(note.description);
        setEditTags(
            Array.isArray(note.tags)
                ? note.tags.join(", ")
                : note.tags
        );
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/notes/${id}`,
                {
                    title: editTitle,
                    description: editDescription,
                    tags: editTags,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setNotes(
                notes.map((note) =>
                    note._id === id ? response.data : note
                )
            );

            setEditingId(null);

            toast.success("Successfully edited");
        } catch (err) {
            console.log(err);
            toast.error("Error editing note");
        }
    };

    const generateSummary = async (id, description) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/ai/summary",
                {
                    text: description,
                }
            );
            const summary=response.data.summary;

            // save to db
            await axios.put(
                `http://localhost:5000/api/notes/${id}/summary`,
                {summary},
                {
                    headers:{
                        Authorization:token,
                    },
                }
            );
            setSummaries({
                ...summaries,
                [id]: response.data.summary,
            });

            toast.success("Summary generated");
        } catch (err) {
            console.log(err);
            toast.error("Failed to generate summary");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
                    My Notes
                </h1>

                {notes.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-white">
                        No notes found
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => {
                            const getFileUrl = (note) => {
                                const url = note.fileUrl;

                                const isPpt =
                                    note.originalFileName?.endsWith(".ppt") ||
                                    note.originalFileName?.endsWith(".pptx");

                                if (isPpt) {
                                    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
                                }

                                return url;
                            };

                            return (
                                <div
                                    key={note._id}
                                    className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                                >
                                    {editingId === note._id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border p-2 mb-3 rounded"
                                            />

                                            <textarea
                                                value={editDescription}
                                                onChange={(e) =>
                                                    setEditDescription(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border p-2 mb-3 rounded"
                                            />

                                            <input
                                                type="text"
                                                value={editTags}
                                                onChange={(e) =>
                                                    setEditTags(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border p-2 mb-3 rounded"
                                            />

                                            <button
                                                onClick={() =>
                                                    handleEdit(note._id)
                                                }
                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setEditingId(null)
                                                }
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-3">
                                                {note.title}
                                            </h2>

                                            <p className="text-sm text-gray-500 mb-2">
                                                Uploaded:{" "}
                                                {new Date(
                                                    note.createdAt
                                                ).toLocaleDateString()}
                                            </p>

                                            <p className="mb-4">
                                                {note.description}
                                            </p>

                                            <p className="text-sm text-purple-600 font-semibold mb-2">
                                                Subject: {note.subject}
                                            </p>

                                            <p className="text-sm text-blue-600 font-medium">
                                                <strong>Tags:</strong>{" "}
                                                {Array.isArray(note.tags)
                                                    ? note.tags.join(", ")
                                                    : note.tags}
                                            </p>

                                            {note.fileUrl && (
                                                <a
                                                    href={getFileUrl(note)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-green-500 text-white py-2 px-4 rounded-md inline-block mt-4 mr-2 hover:bg-green-600"
                                                >
                                                    View File
                                                </a>
                                            )}

                                            <button
                                                onClick={() =>
                                                    generateSummary(
                                                        note._id,
                                                        note.description
                                                    )
                                                }
                                                className="bg-purple-500 text-white px-4 py-2 rounded mt-2 mr-2"
                                            >
                                                Generate AI Summary
                                            </button>

                                            {summaries[note._id] && (
                                                <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                                    <h3 className="font-bold mb-2">
                                                        AI Summary
                                                    </h3>
                                                    <p>
                                                        {
                                                            summaries[
                                                            note._id
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            <button
                                                onClick={() =>
                                                    startEditing(note)
                                                }
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4 mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        note._id
                                                    )
                                                }
                                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-2 ml-1"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyNotes;