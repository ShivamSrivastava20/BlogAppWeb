const express =require('express');


const app=express();
const Router=express.Router();
const authentication=require('./routes/authentication')(Router);

const mongoose =require('mongoose');
const config=require('./Config/Database');

const path=require('path');
const bodyparser=require('body-parser');

const cors =require('cors');




mongoose.Promise=global.Promise;
mongoose.connect(config.uri , (err)=>
{
    if(err)
    {
        console.log("ERROR!!" , err);
    }
    else{
        console.log("Bravo Connected to : ",config.db);
    }
});

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/Client/dist/client'));



app.use('/authentication',authentication);
app.get('*' , (req,res)=>
{
    res.sendFile(path.join(__dirname + '/Client/dist/client/index.html'));
});



app.listen(8080,()=>
{
    console.log('Listening on PORT 8080')
});