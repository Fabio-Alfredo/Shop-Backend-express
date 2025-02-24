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