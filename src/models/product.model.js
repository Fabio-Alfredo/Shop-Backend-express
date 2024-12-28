

module.exports=(sequelize,DataTypes )=>{
    const Product = sequelize.define('Product',
        {
            id:{
                type:DataTypes.UUID,
                defaulValue:DataTypes.UUID,
                primaryKey:true
            },
            name:{
                allowNull:false,
                type:DataTypes.STRING,
                validate:{
                    notNull:true,
                    notEmty:true,
                    len: [3, 30],
                }
            },
            description:{
                allowNull:false,
                type:DataTypes.STRING,
                validate:{
                    notNull:true,
                    notEmty:true,
                    len:[10, 50]
                }
            },
            price:{
                allowNull:false,
                type:DataTypes.DECIMAL(10,2),
                
            },
            stok:{
                allowNull:false,
                type:DataTypes.TINYINT,
                defaultValue:0,
                validate:{
                    notNull:true,
                    notEmty:true
                }
            }
        }
    );
    Product.associate=(models)=>{
        Product.belongsToMany(models.Category, {
            through:'category_products',
            foreignKey: 'productId'
        })
    }

    return Product;
}

