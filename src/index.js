const express= require('express');
const path= require('path');
const multer= require('multer');
const { v4: uuidv4 } = require('uuid');

//initializations
const app= express();

//settings
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares
const storage=multer.diskStorage({
    destination:path.join(__dirname,'./public/images'),
    filename:(req,file,cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname));
    }
});
app.use(multer({
    storage,
    dest:path.join(__dirname,'public/images'),
    limits: {fileSize:2000000},
    fileFilter:(req,file,cb)=>{
        const filetypes = /jpg|jpeg|gif|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
        if(mimetype&&extname){
            return cb(null,true);
        }
        cb("Error: File must be an image");
    }
    }).single('image'));

//routes
app.use(require('./routes/index.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Start the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port:${app.get('port')}`);
})