
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../Model/user');

module.exports = (Router) => {
    Router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an EMAIL !!' });

        }
        else
        {
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide an USERNAME !!' });
        }

        else 
        {
            if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide an PASSWORD !!' });
            }
        
        else {
            let user=new User(
                {
                  email : req.body.email.toLowerCase(),
                  username : req.body.username.toLowerCase(),
                  password : req.body.password,
                });
                user.save((err)=>
                {
                    if(err)
                    {
                        if(err.code===11000)
                        {
                            res.json({success:false , message : 'UserName or Email already exits !!'});
                        }
                    
                  else{
                        if(err.errors)
                        {
                            if(err.errors.email)
                            {
                                res.json({success:false , message :err.errors.email.message});
                            }
                        }
                        else{
                             if(err.errors.username)
                                {
                                    res.json({success:false , message :err.errors.username.message});
                                }
                            
                            else{
                                
                                    if(err.errors.password)
                                    {
                                        res.json({success:false , message :err.errors.password.message});
                                    }
                                
                        else{
                        
                    res.json({success:false , message : 'Could not save user' , err});
                    }}}}}
                
         else{
            res.json({success:true , message : 'USER SAVED ' });
         }
                });
           
        }
        }}
        
     });



    return Router;
}