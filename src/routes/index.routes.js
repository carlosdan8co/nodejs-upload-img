const router = require('express').Router();
const path= require('path');

router.get('/',(req,res)=>{
    res.render('index');
});

router.post('/upload',
    (req,res)=>{
    console.log(req.file);
    res.send('upload');
})

module.exports=router;