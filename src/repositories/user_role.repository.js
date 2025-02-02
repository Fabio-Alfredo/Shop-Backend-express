const {User_role}=require('../models');

const create = async (roleId, userId, editedBy, t)=>{
    const newRelation = await User_role.create({roleId, userId, editedBy}, {transaction: t});
    return newRelation;
}

module.exports={
    create
}
