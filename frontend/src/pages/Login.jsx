import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
                { email, password });
            localStorage.setItem('token', response.data.token);
            //it stores the user data in the local storage of the browser,
            // so that we can access it later to check if the user is logged in or not,
            // and also to get the user details like name and email to display in the UI.

            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            console.log(err);
            toast.error('Login failed');
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <form className='bg-white p-8 rounded-xl shadow-md w-[400px]' onSubmit={handleLogin}>
                <h1 className='text-3xl font-bold mb-6 text-center'>Login</h1>
                <input type="email" placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-3 border rounded-lg mb-4' />
                <input type="password" placeholder='Password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-3 border rounded-lg mb-4' />
                <button type='submit'
                    className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700'>Login</button>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Login;