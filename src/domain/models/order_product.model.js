
/**
 * Modelo de la tabla order_product (tabla intermedia)
 * 
 * @typedef {Object} Order_product
 * @property {UUID} orderId - id de la orden
 * @property {UUID} productId - id del producto
 * @property {Number} quantity - cantidad de productos
 * @property {Date} createdAt - fecha de creacion
 * @property {Date} updatedAt - fecha de actualizacion
 */
module.exports=(sequelize, DataTypes)=>{
    const Order_product = sequelize.define('Order_product',
        {
            quantity:{
                type:DataTypes.TINYINT,
                defaultValue:0,
            }
        },
        {
            timestamps:true,
            tableName:'order_product'
        }
    );

    return Order_product;
}