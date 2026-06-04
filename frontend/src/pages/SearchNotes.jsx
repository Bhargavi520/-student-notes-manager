import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {toast} from 'react-toastify';


function SearchNotes() {

    const [notes, setNotes] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [selectedTag, setSelectedTag] = useState('');
    
    
    // Create unique tags array
    
    const allTags = [
        
        ...new Set(
            
            notes.flatMap((note)=>
                
                Array.isArray(note.tags)
                
                ? note.tags
                
                : []
                
            )
            
        )
        
    ];
    const allSubjects=[...new Set(
                            notes.map((note)=>note.subject)
                            )
                    ];
    const [selectedSubject,setSelectedSubject]=useState('');
    const token=localStorage.getItem('token');



    // Fetch notes from backend

    useEffect(()=>{

        const fetchNotes = async()=>{

            try{

                const response = await axios.get(
                    `${process.env.VITE_APP_API_URL}/api/notes`,{headers:{Authorization:token}}
                );

                setNotes(response.data);

            }catch(err){

                console.log(err);

            }

        };

        fetchNotes();

    },[]);



    // Filter notes

    const filteredNotes = notes.filter((note)=>{

        const matchesSearch =

            (note.title || '').toLowerCase().includes(
                searchTerm.toLowerCase()
            )

            ||

            (note.description || '').toLowerCase().includes(
                searchTerm.toLowerCase()
            )

            ||

            (note.tags || []).join(' ').toLowerCase().includes(
                searchTerm.toLowerCase()
            );



        const matchesTag =

            selectedTag === ''

            ||

            (note.tags || []).includes(selectedTag);

        const matchesSubject=
            selectedSubject==='' ||
                note.subject===selectedSubject;
        return matchesSearch && matchesTag && matchesSubject;

    });



    return(

        <>
            <Navbar/>

            <div className='min-h-screen bg-gray-100 dark:bg-gray-900 p-8'>

                <h1 className='text-4xl font-bold dark:text-white text-center mb-8'>
                    Search Notes
                </h1>



                {/* Search + Tags Section */}

                <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 max-w-5xl mx-auto'>

                    {/* Search Input */}

                    <input
                        type="text"
                        placeholder='Search by title, description or tags...'
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        className='w-full p-4 rounded-xl border border-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6'
                    />



                    {/* Tag Filters */}

                    <div className='flex flex-wrap gap-3'>

                        <button

                            onClick={()=> setSelectedTag('')}

                            className={`px-4 py-2 rounded-lg transition

                                ${selectedTag === ''

                                    ? 'bg-blue-600 text-white'

                                    : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'

                                }`}

                        >

                            All

                        </button>



                        {

                            allTags.map((tag,index)=>(

                                <button

                                    key={index}

                                    onClick={()=> setSelectedTag(tag)}

                                    className={`px-4 py-2 rounded-lg transition

                                        ${selectedTag === tag

                                            ? 'bg-blue-600 text-white'

                                            : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white'

                                        }`}

                                >

                                    #{tag}

                                </button>

                            ))

                        }

                    </div>

                </div>
                <div className='mt-6 dark:text-white'>
                        <h2 className='font-semibold mb-3'>
                            Filter By Subject
                        </h2>
                        <div className='flex flex-wrap gap-3 mb-3 '>
                            <button onClick={()=>setSelectedSubject('')}
                                className={`px-4 py-2 rounded-lg transition
                                    ${selectedSubject===''?'bg-purple-600 text-white ':
                                                            'bg-gray-300 text-gray-700'
                                    }`}
                            >
                                All Subjects
                            </button>
                            {
                                allSubjects.map((subject,index)=>(
                                    <button
                                        key={index}
                                        onClick={()=>setSelectedSubject(subject)}
                                        className={`px-4 py-2 rounded-lg transition
                                        ${selectedSubject===subject?'bg-purple-600 text-white':'bg-gray-300 text-gray-700'}`}
                                    >
                                        {subject}
                                    </button>
                                ))
                            }
                        </div>
                </div>


                {/* Notes Grid */}

                {

                    filteredNotes.length === 0 ? (

                        <p className='text-center dark:text-white text-gray-500 text-lg'>
                            No notes found.
                        </p>

                    ) : (

                        <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 mt-4'>

                            {

                                filteredNotes.map((note)=>(

                                    <div
                                        key={note._id}
                                        className='bg-white dark:bg-gray-500 p-6 rounded-xl shadow hover:shadow-lg transition'
                                    >

                                        <h2 className='text-2xl font-semibold mb-3'>
                                            {note.title}
                                        </h2>

                                        <p className='mb-4 text-gray-700'>
                                            {note.description}
                                        </p>



                                        <div className='flex flex-wrap gap-2'>

                                            {

                                                (note.tags || []).map((tag,index)=>(

                                                    <span
                                                        key={index}
                                                        className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm'
                                                    >

                                                        #{tag}

                                                    </span>

                                                ))

                                            }

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>
        </>


    );

}

export default SearchNotes;