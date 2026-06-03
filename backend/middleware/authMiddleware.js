//This verifies token before protected APIs.
// intercepts incoming API requests to check if a user is securely logged in before letting them access private data.
const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    try{
        const token=req.header('Authorization'); 
        // Looks inside the HTTP request headers(GET /api/notes HTTP/1.1, Host: localhost:5000 , Authorization: eyJhbGciOiJIUzI1NiIs...) sent by the frontend for a key named 'Authorization'
        // if it is not there ,the backend has no idea who is making the request, and req.user cannot be created.
        console.log("TOKEN:",token);
        if(!token){
            return res.status(401).json({
                message:'No token,authorization denied'
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);//passes the token and backend signature key('secret key'),
        // if the token is valid it unpacks the hidden user(id) in it and saves it into decoded  
        req.user=decoded; //it dynamically creates a new property called user on incoming request obj and assigns decrypted data to it 
        next(); //this tells the express that the token is valid and the middleware steps aside and passes control to the next fn in route
    }catch(err){
        console.log(err);
        res.status(401).json({message:'Invalid token'});
    }
};
module.exports=authMiddleware;