const Deposit = require('../models/DepositModel')
const { toArs } = require('../helpers/toArs') 
const { format } = require('date-fns')
const User = require('../models/UserModel')
const { EMPTY_BALANCE, EMPTY_PERIOD } = require('../constants/messages')
const createDeposit = async (req, res, next) => {
    try {
        const { id, amount } = req.user
        const { depositValue, date } = req.body
        
        const dateFormatted = new Date(date)
        const data = { userId: id, amount: depositValue, date: dateFormatted==undefined? dateFormatted: date }
        const deposit = await Deposit.create(data)
        console.log('deposited', deposit)
        const newBalance = amount + depositValue
        const usuario = await User.findOne({
         where: { id: id }
     })
        await usuario.update({
         amount: newBalance,
     })
        const formattedAmount = toArs(depositValue)
       res
           .status(201)
           .json(`Tu deposito de ${formattedAmount} ARS se realizo correctamente.`)
    } catch (err) {
       console.log(err)
    }
       
   }

   const getDepositsByDate = async (req, res) => {
      const { id } = req.user
      
      const deposits = await Deposit.findAll({
         where: { userId: id}
      })
      if(deposits.length < 1){
         return res.status(404).json(EMPTY_BALANCE)
        }
        const from = req.query.from
        const to = req.query.to

        if(!to && !from){
         return res.status(500).json(deposits)
        }
        
        filteredDeposits = deposits.filter(deposit => {
         const date = deposit.getDataValue('date')
         const dateF = format(new Date(date.split('-')), 'yyyy/MM/dd' )
         if(!to){ return (dateF >= from )}
         if(!from){ return (dateF <= to)}
         return (dateF >= from && dateF <= to)
       })
       if(filteredDeposits.length < 1){
        return res.status(200).json(EMPTY_PERIOD)
       }
        return res.status(200).json(filteredDeposits)
   }

   module.exports = { createDeposit, getDepositsByDate }