const user_roleRepository = require('../repositories/user_role.repository');
const serviceError = require('../utils/errors/service.error');

const createRelation = async (userId, roleId, editedBy, t)=>{
    try{
        console.log('create relation')
        await user_roleRepository.create(userId, roleId, editedBy, t)
        return true;
    }catch (e){
        throw new serviceError(
            e.message || 'Internal server error',
            e.code || 500
        )
    }
}

module.exports={
    createRelation
}