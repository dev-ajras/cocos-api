
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");




const validarJWT = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ msg: 'no se detecto un token en la peticion' })
  }
  try {

    let noBearerToken = token
    if(token.startsWith('Bearer')){
       noBearerToken = token.slice(7)
    }
    const { id} = jwt.verify(noBearerToken, process.env.JWT_SECRET)
    
    console.log( id )
    const user = await User.findOne({ where: {id} })

    console.log(user)
    // Cliente no existe en DB

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'token invalido...' })
    }


    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({ msg: 'token invalido' })
  }
};

module.exports = { validarJWT } 