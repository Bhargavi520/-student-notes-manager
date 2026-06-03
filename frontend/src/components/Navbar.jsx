import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Study Manager
      </h1>
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="text-gray-800 hover:text-blue-600 dark:text-white font-medium"
        >
          Home
        </Link>
        <Link
          to="/upload"
          className="text-gray-800 hover:text-blue-600 dark:text-white font-medium"
        >
          Upload
        </Link>
        <Link
          to="/my-notes"
          className="text-gray-800 hover:text-blue-600 dark:text-white font-medium"
        >
          Notes
        </Link>
        <Link
          to="/search"
          className="text-gray-800 hover:text-blue-600 dark:text-white font-medium"
        >
          Search
        </Link>
        <Link
          to="/profile"
          className="text-gray-800 hover:text-blue-600 dark:text-white font-medium"
        >
          Profile
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
