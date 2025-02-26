//DTO utilizado para mapear una orden
//se mapea la orden con los productos
const MapOrder = async (order) => {
  const { Product_variants, ...orderData } = order.toJSON();

  const products = Product_variants.map((product) => {
    return {
      sku: product.Product.sku,
      id: product.id,
      name: product.Product.name,
      description: product.Product.description,
      color: product.color,
      size: product.size,
      price: product.Product.price,
      quantity: product.Order_product.quantity,
    };
  });

  orderData.products = products;

  return orderData;
};

module.exports = {
  MapOrder,
};
