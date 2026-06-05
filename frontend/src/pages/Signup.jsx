import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
const API= import.meta.env.VITE_API_URL;

function Signup(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();

    const handleSignup=async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`${API}/api/auth/signup`,
                {name,email,password});
            navigate('/login');
            
        }catch(err){
            console.log(err);
            toast.error('Signup failed');
        }
    };

    return(
        <div className='min-h-screen flex justify-center items-center bg-grey-100 dark:bg-gray-900'>
            <form onSubmit={handleSignup} className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-[400px]'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Sign Up</h1>
                <input type="text" placeholder='Name' value={name} 
                onChange={(e)=>setName(e.target.value)}
                    className='w-full p-3 border rounded-lg mb-4'/>
                <input type="text" placeholder='Email' value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                    className='w-full p-3 border rounded-lg mb-4'/>
                <input type="password" placeholder='Password' value={password}
                onChange={(e)=>setPassword(e.target.value)}
                    className='w-full p-3 rounded-lg mb-4' />
                <button className='w-full bg-blue-600 text-white p-3 rounded-lg 
                    hover:bg-blue-700'>Signup</button>
            </form>
        </div>
    );
}

export default Signup;