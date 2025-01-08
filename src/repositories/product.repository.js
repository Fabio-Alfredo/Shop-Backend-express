const {Product} = require('../models');

const create = async (product)=>{
    const newProduct = await Product.create(product);
    return newProduct;
}


module.exports ={
    create
}
