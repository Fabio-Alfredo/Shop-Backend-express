const Stripe = require('stripe');
const config = require('./config')

const stripe = Stripe(config.production.stripe);


module.exports = stripe;