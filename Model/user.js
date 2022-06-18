const mongoose =require('mongoose');
mongoose.Promise=global.Promise;
const bcrypt=require('bcrypt-nodejs');

let emailLengthChecker=(email) =>
{
    if(!email)
    {
        return false;
    }
    else
    {
        if(email.length < 5 || email.length > 30)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
};

let validEmailChecker =(email)=>
{
    if(!email)
    {
        return false;
    }
    else{
        const regExp=new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

const emailValidators =[
    {
        validator : emailLengthChecker , message : 'Email must be atleast 5 character but not more than 30 characters'
    },
    {
        validator : validEmailChecker , message : 'Please enter a valid Email!!'
    }
];



//Username field Validations 

let usernameLengthChecker=(username) =>
{
    if(!username)
    {
        return false;
    }
    else
    {
        if(username.length < 5 || username.length > 30)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
};

let validUsernameChecker =(username)=>
{
    if(!username)
    {
        return false;
    }
    else{
        const regExp=new RegExp( /^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

const usernameValidators =[
    {
        validator : usernameLengthChecker , message : 'Username must be atleast 5 character but not more than 30 characters'
    },
    {
        validator : validUsernameChecker , message : 'Please enter a valid UserName!!'
    }
];


let passwordLengthChecker=(username) =>
{
    if(!password)
    {
        return false;
    }
    else
    {
        if(password.length < 5 || password.length > 30)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
};

let validPasswordChecker =(password)=>
{
    if(!password)
    {
        return false;
    }
    else{
        const regExp=new RegExp( /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(username);
    }
}

const passwordValidators =[
    {
        validator : passwordLengthChecker , message : 'Password must be atleast 5 character but not more than 30 characters'
    },
    {
        validator : validPasswordChecker , message : 'Your Password must have atleast 1 UPPERCASE , 1 LOWERCASE , 1 SPECIALCASE and 1 NUMBER  '
    }
];


const Schema=mongoose.Schema;
const userschema=new Schema(
    {
       email : { type: String , required:true , unique : true , lowercase:true , validate:emailValidators},
       username : { type: String , required:true , unique : true , lowercase:true , validate:usernameValidators},
       password : { type: String , required:true ,validate:passwordValidators},
      
    }
);
// encrypting password
userschema.pre('save' , function(next)
{
   if(!this.isModified('password'))
   {
    return next();
   } 
   bcrypt.hash(this.password,null,null,(err,hash)=>
   {
    if(err)
    return next(err);

    this.password=hash;
    next();
   });
});
// Decrypting password to be used in login feature
userschema.methods.comparePassword = (password) =>
{
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User' , userschema);