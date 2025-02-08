const variantsRepository = require("../repositories/product_variants.repository");
const variantsCodes = require("../utils/errors/errorsCodes/variants.code");
const ServiceError = require("../utils/errors/service.error");

const save = async (variants, productId, t) => {
  try {
    const saveVariants = variants.map((variant) => {
      return {
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        productId: productId,
      };
    });
    console.log(saveVariants);
    return await variantsRepository.save(saveVariants, t);
  } catch (e) {
    throw new ServiceError(
      e.message || "Error in save variants",
      e.code || variantsCodes.NOT_FOUND
    );
  }
};

const reservationProducts = async(items, t)=>{
    try{
        
        const products = await getProductsMap(items);
        await validateStock(items, products);
        console.log('aca llega')
        const update = await updateStock(items, products, 'buy', t);
        return update
    }catch(e){
        throw new ServiceError(
            e.message || 'Error al crear la reservacion de productos',
            e.code || variantsCodes.NOT_FOUND
        )
    }
}

const getProductsMap = async (items) => {
  const productIds = items.map((item) => item.id);
  const products = await variantsRepository.findAllByIds(productIds);
  if (productIds.length != items.length) {
    throw new ServiceError(
      "Algunos productos no estan disponibles",
      variantsCodes.NOT_FOUND
    );
  }
  return new Map(products.map(p=>[p.id, p]));
};

const validateStock = async (items, products)=>{
    try{
        for(const item of items){
            const product = products.get(item.id)
            if(product.stock < item.quantity)
                throw new ServiceError(
            `Cantidad insuficiente de ${product.name}`),
            variantsCodes.NOT_FOUND
        }
        return true
    }catch(e){
        throw new ServiceError(
            e.message || 'Error al calcular el stock',
            e.coode || variantsCodes.NOT_FOUND
        )
    }
}

const updateStock = async (items, products, operation, t)=>{
    try{
        const updateProducts = items.map((item)=>{
            const product = products.get(item.id);
            if(!product)
                throw new ServiceError(
                    `EL roducto ${product.name} no fue encontrado`,
                    variantsCodes.NOT_FOUND
            )
            return{
                id:product.id,
                stock: operation === 'buy' ?product.stock - item.quantity : product.item + item.quantity,
            };
        })
        return await variantsRepository.bulkUpdateStock(updateProducts, t)
    }catch(e){
        throw new ServiceError(
            e.message || 'Error al recalcular el stock',
            e.code || variantsCodes.NOT_FOUND
        )
    }
}


module.exports = {
  save,
  reservationProducts
};
