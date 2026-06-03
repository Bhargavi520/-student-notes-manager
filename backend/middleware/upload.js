const multer =require('multer');
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require('../config/cloudinary');
// why keep it as middelware? 

// what is does?
// This code sets up multer, a middleware for handling multipart/form-data, which is primarily used for uploading files. 
// It defines a storage configuration that=specifies the destination directory for uploaded files ('uploads/') ,and a filename format that includes a timestamp to ensure uniqueness.
// The configured multer instance is then exported for use in other parts of the application, such as in route handlers where file uploads are processed.
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//         // cb? The cb is a callback function that is used to specify the destination directory for uploaded files.. In this case, it sets the destination to 'uploads/'.
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//         // cb? The cb is a callback function that is used to specify the filename for uploaded files. It takes two arguments: an error (if any) and the filename. In this case, it sets the filename to a timestamp followed by the original name of the file.
//     }
// });
const storage=new CloudinaryStorage({
    cloudinary,
    params:async(req,file)=>({
        folder:"student-notes",
        resource_type:"raw",
        use_filename:true,
        unique_filename:false,
        public_id: file.originalname,
    }),
});

// This creates middleware called upload.You use it in routes like: app.post("/upload", upload.single("file"), controller);
const upload=multer({
    storage
});

module.exports=upload;