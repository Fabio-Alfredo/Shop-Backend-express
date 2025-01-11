const {Order_product} = require("../models");

const create = async (ordere_product) => {
  const newRelation = await Order_product.create(ordere_product);
  return newRelation;
};


module.exports ={
    create
}