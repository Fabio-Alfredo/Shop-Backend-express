const variantsRepository = require('../repositories/product_variants.repository');
const variantsCodes = require('../utils/errors/errorsCodes/variants.code');
const ServiceError = require('../utils/errors/service.error');

const save = async (variants, productId, t)=>{
    try{
        const saveVariants = variants.map(variant => {
             return{
                 color: variant.color,
                 size: variant.size,
                 stock: variant.stock,
                 productId: productId
             }
        })
         console.log(saveVariants)
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

