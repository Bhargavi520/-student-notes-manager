const express=require('express');
const Note=require('../models/Note');
const router=express.Router();
const upload=require('../middleware/upload');
const authMiddleware=require('../middleware/authMiddleware');



// post submits the data to the server, and get retrieves the data from the server, put updates the data on the server, and delete removes the data from the server
router.post('/',authMiddleware,upload.single('file'),async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        console.log(req.user);
        const note=new Note({title:req.body.title, //explain this line
            description:req.body.description,
            subject:req.body.subject,
            tags:req.body.tags,
            fileUrl:req.file ? req.file.path : '',  //does it include (/uploads/filename) ? yes, req.file.path will include the path to the uploaded file, which typically starts with 'uploads/' followed by the filename
            originalFileName:req.file.originalname,
            user:req.user.id,
            shared:req.body.shared
            // from where the req.body.user will come?
            // 
            
        }); 
        
            // This line creates a new instance of the Note model with the data from the request body
        // what does req.body contain ? it contains the data sent by the client in the request, which should include the title, description, tags, and fileUrl for the note being created
        // where we are saving it ? we are saving it to the database using the save() method of the Note model, which will insert a new document into the notes collection in MongoDB
        // why post why not get ?
        // POST is used to create new resources, while GET is used to retrieve existing ones
        // so here we are creating a new note, hence we use POST
        await note.save();
        res.status(201).json(note); 
        // 201 status code means that the resource has been successfully created
    }catch(err){
        console.log(err);
        
        res.status(500).json({message:'Server error'});
    }
});

router.get('/',authMiddleware,async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id}).sort({createdAt:-1}); //-1 means descending order(newest first),1 means (oldest first)
        res.json(notes); //send the notes as a JSON response to the client(frontend)
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
});


router.delete('/:id',authMiddleware,async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:'Note not found'});
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({message:'Unauthorized'});
        }
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Note deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
});

router.put('/:id',authMiddleware,async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note){return res.status(404).json({message:'Note not found'});}
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({message:'Unauthorized'});
        }
        await Note.findByIdAndUpdate(req.params.id,req.body,{returnDocument:'after'});
        res.json(note);//res.json(note) sends the updated note as a json res to frontend
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
});

router.put("/:id/summary",authMiddleware,async(req,res)=>{
    try{
        const note=await Note.findByIdAndUpdate(req.params.id,{
            summary:req.body.summary
        },{new:true});
        res.json(note);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error saving summary"
        });
    }
});


module.exports=router;