const express = require('express')

const  { 
    createUser, loginUser, getUserBalance
 } = require('../controllers/userController');

const {
    createDeposit, getDepositsByDate
} = require('../controllers/depositController');
const { validarJWT } = require('../auth/validarJWT');
 


 // Init express router
const router = express.Router();
 


router.post('/api/users', createUser);



router.post('/api/auth/login',loginUser)

//Route Create new Deposit

router.post('/api/deposits',validarJWT, createDeposit)
router.get('/api/users/balance', validarJWT, getUserBalance)
router.get('/api/deposits',validarJWT, getDepositsByDate)

// export router
module.exports = router;
 