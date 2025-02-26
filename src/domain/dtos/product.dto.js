const productDto = (product) => {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    description: product.description,
    price: product.price,
    categories: product.Categories.map((category) => {
      return {
        id: category.id,
        name: category.category,
      };
    }),
    variants: product.product_variants.map((variant) => {
      return {
        id: variant.id,
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
      };
    }),
  };
};


module.exports = productDto;