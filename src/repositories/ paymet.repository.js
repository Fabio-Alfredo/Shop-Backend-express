const {Payment} = require('../models')

const create = async (payment)=>{
    const newPayment = Payment.create(payment);
    return newPayment;
}

module.exports = {
    create
}