const {Product_variants}=require('../models');

const save=async(variants, t)=>{
    const saveVariants =   await  Product_variants.bulkCreate(variants, {transaction:t});
    return saveVariants;
}


module.exports={
    save
}