const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

function createToken(user) {
  let scopes;
  //!check if the user object passed in
  //!has admin set to true and if so, set
  //! scopes to admin
  if (user.role == "admin") {
    scopes = "admin";
  } else {
    scopes = "user";
  }
  //sign the token
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      scope: scopes,
      user_email: user.email,
    },
    secret,
    { algorithm: "HS256", expiresIn: 86400 }
  );
}

module.exports = createToken;
