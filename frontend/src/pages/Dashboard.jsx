import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

import {
  FaUpload,
  FaBook,
  FaSearch
} from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';


function Dashboard() {
  // authentication- identifiying who you are
  // authorization - what features you can access

  const dashboardItems = [
    {
      title: 'Upload Notes',
      description: 'Upload PDFs and study materials.',
      path: '/upload',
      buttonText: 'Open',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: <FaUpload size={40} className='text-blue-500 mb-4' />
    },
    {
      title: 'My Notes',
      description: 'View your uploaded notes.',
      path: '/my-notes',
      buttonText: 'View',
      color: 'bg-green-500 hover:bg-green-600',
      icon: <FaBook size={40} className='text-green-500 mb-4' />
    },
    {
      title: 'Search Notes',
      description: 'Search Notes by title.',
      path: '/search',
      buttonText: 'Search',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      icon: <FaSearch size={40} className='text-yellow-500 mb-4' />

    }
  ]
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalNotes: 0,
    totalSubjects: 0,
    aiSummaries: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stats");
      setStats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-6xl font-bold mb-4">
          Student Study Management
        </h1>

        <p className="text-xl max-w-2xl mb-8">
          Upload notes, organize study materials, search files,
          and manage your learning resources in one place.
        </p>

        <button
          onClick={() =>
            document.getElementById("features").scrollIntoView({
              behavior: "smooth"
            })
          }
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold"
        >
          Get Started
        </button>

      </div>
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-500">
              {stats.totalNotes}
            </h2>
            <p>Total Notes</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">
              {stats.totalSubjects}
            </h2>
            <p>Subjects</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-purple-500">
              {stats.totalStudents}
            </h2>
            <p>Students</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-orange-500">
              {stats.aiSummaries}
            </h2>
            <p>AI Summaries</p>
          </div>

        </div>
      </div>
      <div
        id="features"
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8"
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              {item.icon}

              <h3 className="text-xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 mb-4">
                {item.description}
              </p>

              <Link to={item.path}>
                <button
                  className={`${item.color} text-white px-4 py-2 rounded`}
                >
                  {item.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



export default Dashboard;