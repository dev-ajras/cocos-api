const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const { createJWT } = require('../helpers/createJWT')
const { toArs } = require('../helpers/toArs')
const { INVALID_AUTH, EMPTY_BALANCE, SERVER_ERROR } = require('../constants/messages')


    // Login user
    const loginUser = async (req, res) => {
        const { username, password} = req.body
    
        // Check username in database
        try {
            const user = await User.findOne({ where: { username } })
            if(!user){
                return res.status(203).send(INVALID_AUTH)
            }
        // Check Password in database
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(201).send(INVALID_AUTH)
            }
            
            const token = await createJWT(user)
            console.log(token)
            res.status(200).json({token})
    
        }catch(error) {
            console.log(error)
        }
    }
    

    const createUser = async (req, res) => {
        const data = req.body
        try {
            const salt = bcrypt.genSaltSync();
            const user = new User({
                firstname: data.firstName,
                lastname: data.lastName,
                amount: data.amount,
                username: data.userName,
                password: bcrypt.hashSync(data.password, salt), 
          
            })

          await user.save()

        res.json({
            "message": "User Created", user
        });
    } catch (err) {
        console.log(err);
    }
}
 
const getUserBalance = async (req, res) => {
    try {
       const { amount } = req.user
       if(amount == 0){
            return res.status(200).json(EMPTY_BALANCE)
       }
      const amountFormatted = toArs(amount)

      return res.status(200).json(`Total depositado: ARS ${amountFormatted}`)
    } catch (err){
          console.log(err)
          return res.status(500).json(SERVER_ERROR)
    }
 }

 

module.exports = { createUser, loginUser, getUserBalance }