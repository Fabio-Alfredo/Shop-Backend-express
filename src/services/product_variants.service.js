const variantsRepository = require('../repositories/product_variants.repository');
const variantsCodes = require('../utils/errors/errorsCodes/variants.code');
const ServiceError = require('../utils/errors/service.error');

const save = async (variants, productId, t)=>{
    try{
        const saveVariants = variants.map(variant => {
             variant.producId = productId
            return variant
        })
        return  await variantsRepository.save(saveVariants, t);
    }catch (e){
        throw new ServiceError(
            e.message || 'Error in save variants',
            e.code || variantsCodes.NOT_FOUND
        )
    }
}

module.exports ={
    save
}

