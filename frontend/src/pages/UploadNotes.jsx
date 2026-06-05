import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
const API= import.meta.env.VITE_API_URL;


function UploadNotes() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !tags) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      setUploading(true);//what it does ? it sets the uploading state to true, which can be used to disable the upload button and show a loading indicator while the note is being uploaded to the server. This helps to prevent multiple submissions and provides feedback to the user that the upload process is in progress.
      const formData = new FormData();
      // form data conatains binary data make it easy for file uploading
      formData.append('title', title);
      formData.append('description', description);
      formData.append('subject', subject);
      formData.append('tags', tags);
      formData.append('file', file);
      // syntax? axios.post(url,data)
      await axios.post(`${API}/api/notes`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Note uploaded successfully');
      setTitle('');
      setDescription('');
      setSubject('');
      setTags('');
      setFile(null);
    } catch (err) {
      console.log(err);
      toast.error('Error uploading note');
      return;
    }
    setUploading(false);
  }
  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-gray-100 dark:bg-gray-900  p-8' >

        <h1 className='text-4xl font-bold text-center mb-8 dark:text-white'>Upload Notes</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input className='block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
            type="text" placeholder="Note Title" value={title}
            onChange={(e) => { setTitle(e.target.value) }} />
          <textarea className='dark:text-white block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' name="" id="" placeholder="Enter description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
          <input
            type="text"
            list="subjects"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="dark:text-white w-full p-3 border rounded-lg"
          />

          <datalist id="subjects">
            <option value="DBMS" />
            <option value="Operating Systems" />
            <option value="Computer Networks" />
            <option value="Java" />
            <option value="DSA" />
            <option value="Compiler Design" />
          </datalist>
          <input className='dark:text-white block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Enter tags (#exam #important)" value={tags} onChange={(e) => { setTags(e.target.value) }} />
          <input type="file" className='dark:text-white p-2' onChange={(e) => setFile(e.target.files[0])} />
          {/* why .files[0] ? Because e.target.files is a FileList (similar to an array) containing all selected files, and [0] accesses the first file in that list */}

          <button className='dark:text-white bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600' type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Note'}
          </button>
        </form>
      </div>
    </>
  );
}

export default UploadNotes;