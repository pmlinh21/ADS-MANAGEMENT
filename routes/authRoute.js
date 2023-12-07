const authRouter = require('express').Router()
const passport = require('passport')

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', "email"], session: false }));

authRouter.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, info) => {
    req.info = info;
    next();
  })(req,res,next)
}, (req, res) => {
  console.log(req.info)
  res.redirect("/")
}
);

module.exports = authRouter;