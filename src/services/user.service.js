const userRepository = require('../repositories/user.repository');
const roleService = require('../services/role.service');
const user_roleService = require('../services/user_role.service');
const userCodes = require('../utils/errors/errorsCodes/user.codes');
const serviceError = require('../utils/errors/service.error');


const assignRole = async (roleId, userId, t)=>{
    try {
        const user = await  findById(userId, t);
        const role= await  roleService.findById(roleId);
        await user_roleService.createRelation(role.id, user.id,null, t);
        return true
    }catch (e){
        throw new serviceError(
            e.message || 'Internal server error',
            e.code || userCodes.NOT_FOUND
        )
    }
}

const findById = async (id, t)=>{
    try{
        const user = await userRepository.findById(id, t);
        if(!user)
            throw new serviceError(
                'Invalid data user',
                userCodes.USER_NOT_EXISTS
            )
        return user;
    }catch (e){
        throw new serviceError(
            e.message || 'Internal service error',
            e.code || userCodes.NOT_FOUND
        )
    }
}

module.exports ={
    assignRole,
    findById
}
