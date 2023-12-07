const sequelize = require('./models/index');
const init_models = require('./models/init-models');
const model = init_models(sequelize);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  let Phuong = await model.CanboPhuong.findOne({
      where: { email: profile.emails[0].value }
  })
  let Quan = await model.CanboQuan.findOne({
      where: { email: profile.emails[0].value }
  })
  let So = await model.CanboSo.findOne({
      where: { email: profile.emails[0].value }
  })

  if (!Phuong && !Quan && !So) {
    console.log("false");
    return cb(new Error('Email not found.'), false);
  }

  console.log("true");
  // Return the appropriate user object
//   if (Phuong) {
//       return cb(null, {Phuong, role: "2"});
//   } else if (Quan) {
//       return cb(null, {Quan, role:  });
//   } else {
//       return cb(null, So);
//   }
}
)); 