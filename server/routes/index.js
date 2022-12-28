var express = require('express');
var router = express.Router();
var passport = require('passport');

var services=require('../services/render')
var controllers=require('../controller/controller')

const verifyLogin = (req, res, next) => {
    if (req.session.userloggedIn) next();
    else res.redirect("/login");
  };
  
/* GET home page. */
router.get('/', services.index);

router.get('/login', services.login);

router.get('/register', services.signup);

router.get('/calorie',verifyLogin, services.calorie);


router.post('/register',controllers.signup)

router.post('/login',controllers.login)

router.post('/calorie',verifyLogin,controllers.addcalorie)

router.get('/deletecal/:id',verifyLogin,controllers.delete)

router.get('/editcal/:id',verifyLogin,services.finditem)

router.post('/updatecalorie/:id',verifyLogin,controllers.update)

module.exports = router;
