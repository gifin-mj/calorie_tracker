const user = require('../models/usermodel');
var usermodel=require('../models/usermodel');
var caloriemodel=require('../models/caloriemodel')

exports.signup=(req,res,next)=>{

    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return
    }
    else{
        if(req.body.password === req.body.cpassword){
            const user=usermodel({
            name:req.body.name,
            password:req.body.password
            })
            user
                .save()
                .then(()=>{
                    res.redirect('/')
                })
                .catch((err)=>{
                    res.status(500).send({
                        message : err.message || "Some error occurred while creating a create operation"
                    });
                })
            
        }
        else{
            res.render('register',{status:true})
        }
    }
}

exports.login= async(req,res,next)=>{
    let username=req.body.username
    let password=req.body.password
    const user = await usermodel.findOne({ name: username,password:password });
    if (!user) {
      res.render('login',{status:true})
    }
    else{
        console.log(user);
        req.session.user = user;
        req.session.userloggedIn = true;
        res.redirect('/')
    }
}

exports.addcalorie=(req,res,next)=>{
    console.log(req.body);
    const calorie=new caloriemodel({
        userid:req.body.userid,
        food:req.body.food,
        quantity:req.body.quantity,
        calorie:req.body.calorie,
        caldate:req.body.caldate
    })
    calorie
        .save()
        .then((result)=>{
        res.redirect('/')
        })
        .catch((err)=>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        })
    
}
exports.delete=(req,res,next)=>{
    let id=req.params.id
    caloriemodel.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.redirect('/')
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}

exports.update=(req,res,next)=>{
        let id=req.params.id
        console.log(req.body);
        console.log(id);
        caloriemodel.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
            .then((data)=>{
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                        res.redirect('/')
                }
            })
            .catch((err)=>{
                res.status(500).send({ message : "Error Update user information"})
            })
}