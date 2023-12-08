const authRouter = require('express').Router()
const passport = require('passport')
const authController = require ('../controllers/authController')
const { parseToken } = require('../middlewares/baseToken');
require("dotenv").config()

const cookieParser = require("cookie-parser");

authRouter.use(cookieParser(process.env.JWT_SECRET_KEY))

const session = require('express-session');
authRouter.use(session({
  secret: process.env.JWT_SECRET_KEY, // Replace with your secret key
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: true,
    maxAge: 20 * 60 * 1000
  }
}));

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', "email"], session: false }));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, info) => {
    if (err) {
      return res.redirect("/login?status=unsuccessful")
    }

    req.info = info;
    next();
  })(req,res,next)
}, (req, res) => {
  const infoCanbo =  req.info['Quan']['dataValues']
  const infoRole = req.info.role
  let content = {email: infoCanbo.email, role: infoRole}
  if (infoRole == "1"){
    content = {...content, id_district: infoCanbo.id_district}
  } else if (infoRole == "2"){
    content = {...content, id_ward: infoCanbo.id_ward}
  }

  console.log(content)
  res.cookie("token", parseToken(content),  {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: false,
  })

  res.redirect("/")
}
);

module.exports = authRouter;