const {Role} = require('../models');

const create =  async  (id, role)=>{
    const newRole = await Role.create({id, role});
    return newRole;
}

const findById = async (id)=>{
    const role = await Role.findByPk(id);
    return role;
}

module.exports={
    create,
    findById
}