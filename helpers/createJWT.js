const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  return new Promise((resolve, reject) => {

  const { id, username, firstname, lastname, amount } = user
    const payload = { username, id, firstname, lastname, amount};
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          reject("Token could not be created");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { createJWT };