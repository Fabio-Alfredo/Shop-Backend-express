"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("category", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("category_products", {
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "products", // Referencia a la tabla `products`
          key: "id",
        },
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.STRING,
        references: {
          model: "category", // Referencia a la tabla `category`
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
      },
      direction: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "PAID",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED"
        ), // Define los estados posibles
        defaultValue: "PENDING",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
    });

    await queryInterface.createTable("order_product", {
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "id",
        },
        allowNull: false,
      },
      productVariantId: {
        type: Sequelize.UUID,
        references: {
          model: "product_variants", // Asegúrate de que 'product_variants' existe
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("payment", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false, // Asegura que este campo no sea nulo
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false, // Asegura que este campo no sea nulo
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("payment_history", {
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "orders", // Nombre de la tabla Orders
          key: "id",
        },
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.UUID,
        references: {
          model: "payment", // Nombre de la tabla Payment
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('product_variants', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      color: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false, // Asegura que el stock sea obligatorio
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'products', // Nombre de la tabla Product
          key: 'id',
        },
        onDelete: 'CASCADE', // Si un producto se elimina, se eliminan sus variantes
        allowNull: false,
      },
    });

    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('user_roles', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users', // Nombre de la tabla User
          key: 'id',
        },
        onDelete: 'CASCADE', // Si un usuario se elimina, se elimina la relación
        allowNull: false,
      },
      roleId: {
        type: Sequelize.STRING,
        references: {
          model: 'roles', // Nombre de la tabla roles
          key: 'id',
        },
        onDelete: 'CASCADE', // Si un rol se elimina, se elimina la relación
        allowNull: false,
      },
      assignedIn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      editedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("category");
    await queryInterface.dropTable("category_products");
    await queryInterface.dropTable("orders");
    await queryInterface.dropTable("order_product");
    await queryInterface.dropTable("payment");
    await queryInterface.dropTable("payment_history");
    await queryInterface.dropTable("product_variants");
    await queryInterface.dropTable("products");
    await queryInterface.dropTable("roles");
    await queryInterface.dropTable("user_roles");
    await queryInterface.dropTable("users");
  },
};