import {Navigate} from 'react-router-dom';
function ProtectedRoute({children}){
    const token=localStorage.getItem('token');
    // localStorage: built-in storage area in the web browser  data stays there even if the user closes the tab
    // built-in method that searches localStorage for a key named exactly 'token
    // browser finds the key. The variable token will equal a long string of characters or null
    if(!token){
        return <Navigate to='/login' />
    }
    return children;
}
export default ProtectedRoute;
// is like a security guard for your frontend pages.It checks:"Is user logged in?"

// children: ProtectedRoute({ children })
// children means:
// whatever component is inside ProtectedRoute
// Example:<ProtectedRoute> <MyNotes/> </ProtectedRoute>

//