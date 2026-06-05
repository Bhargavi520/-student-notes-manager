import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
// used to export a single member from a module.import this function in another file without using curly braces.
// Normal Function- This ONLY creates the function.
// It is NOT available outside the file yet.To use it in another file, you must export it:
// So together:
// function Profile() {
//    return <h1>Profile</h1>;
// }
// export default Profile;
// This is exactly same as:
// export default function Profile() {
//    return <h1>Profile</h1>;
// }
// Just shorter.

const API= import.meta.env.VITE_API_URL;

export default function Profile() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");

    const token = localStorage.getItem("token");

    // fetch profile
    useEffect(() => {
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${API}/api/profile`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            console.log(response.data);
            setUser(response.data);
            setName(response.data.name || "");
            setBio(response.data.bio || "");
            setCollege(response.data.college || "");
            setBranch(response.data.branch || "");
        } catch (err) {
            console.log(err);
        }
    };

    // update profile
    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${API}/api/profile`,
                {
                    name,
                    bio,
                    college,
                    branch
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            setUser(response.data);
            setEditMode(false);
        } catch (err) {
            console.log(err);
        }
    };
    if (!user) {
        return <h1 className="text-center mt-10">Loading .. .</h1>;
    }
    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-bray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
                {/* profile top */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                {/* info */}
                <div className="mt-6 space-y-4">
                    <div>
                        <h2 className="font-semibold text-gray-700">Bio</h2>
                        {
                            editMode ? (
                                <textarea className="w-full border p-2 rounded mt-1" value={bio} onChange={(e) => setBio(e.target.value)} />
                            ) : (
                                <p>{user.bio || "No bio needed"}</p>
                            )
                        }
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-700">College</h2>
                        {
                            editMode ? (
                                <input type="text" value={college} onChange={(e) => setCollege(e.target.value)}
                                    className="w-full border p-2 rounded mt-1" />
                            ) : (
                                <p>{user.college || "Not added"}</p>
                            )
                        }
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-700">
                            Branch
                        </h2>

                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            ) : (
                                <p>{user.branch || "Not added"}</p>
                            )
                        }
                    </div>
                    {
                        // true && "showThis"
                        editMode && (
                            <div>
                                <h2 className="font-semibold text-gray-700">
                                    Name
                                </h2>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            </div>
                        )
                    }
                </div>
                {/* buttons */}
                <div className="mt-6">
                    {
                        editMode ? (
                            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Profile</button>
                        ) : (
                            <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</button>
                        )
                    }
                </div>
            </div>
            <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-bold mb-4">
                    Statistics
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    <div className="bg-purple-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                            Notes Uploaded
                        </p>
                        <h3 className="text-2xl font-bold">
                            {user.stats?.notesUploaded || 0}
                        </h3>
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                            Subjects
                        </p>
                        <h3 className="text-2xl font-bold">
                            {user.stats?.subjectsCount || 0}
                        </h3>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                            Recent Uploads
                        </p>
                        <h3 className="text-2xl font-bold">
                            {user.stats?.recentUploads || 0}
                        </h3>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                            AI Summaries
                        </p>
                        <h3 className="text-2xl font-bold">
                            {user.stats?.aiSummaries || 0}
                        </h3>
                    </div>

                </div>
            </div>
        </div>
    </>
    );
}