const toArs = (number) => {
    const formattedNumber = number.toLocaleString('es-ar', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
})

return formattedNumber 
}

module.exports = { toArs }