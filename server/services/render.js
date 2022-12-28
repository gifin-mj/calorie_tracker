var passport = require('passport');
var caloriemodel=require('../models/caloriemodel')

var controllers=require('../controller/controller')

exports.index=function(req, res, next) {
      let user=req.session.user
      if(req.session.userloggedIn){
        let user=req.session.user
        let userid=null
        user.id?userid=user.id:userid=user._id
        caloriemodel.find({userid:userid})
        .then((result)=>{
          console.log(result);
          res.render('index',{user,calorie:result})
        })
      }
      
      else{
      caloriemodel.find()
      .then((result)=>{
        console.log(result);
        let user=req.session.user
        res.render('index',{user,calorie:result})
      })
    }

}

exports.login=function(req, res, next) {
    res.render('login');
}


exports.signup=(req,res,next)=>{
  res.render('register')
}

exports.calorie=(req,res,next)=>{
  let user=req.session.user
  res.render('calorie',{user})
}

exports.finditem=(req,res,next)=>{
  id=req.params.id
  let user=req.session.user
  caloriemodel.findById(id)
  .then(data =>{
      if(!data){
          res.status(404).send({ message : "Not found user with id "+ id})
      }else{
          console.log(data);
          res.render('calorie',{user,calorie:data})
      }
  })
  .catch(err =>{
      res.status(500).send({ message: "Error retrieving book with id " + id+err})
  })
}