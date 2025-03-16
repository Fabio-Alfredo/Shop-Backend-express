const Stripe = require('stripe');
const config = require('./config')

// Configuración de Stripe
// Se crea una instancia de Stripe con la clave secreta de Stripe
const stripe = Stripe(config.stripe);


module.exports = stripe;