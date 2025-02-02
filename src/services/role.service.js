const roleRepository = require('../repositories/role.repository');
const serviceError = require('../utils/errors/service.error');
const roleCodes = require('../utils/errors/errorsCodes/role.code');


const findById = (id)=>{
    try{
        const role = roleRepository.findById(id);
        if(!role)
            throw new serviceError(
                'Invalid role, not exists',
                roleCodes.ROLE_NOT_EXISTS
            )
        return  role;
    }catch (e){
        throw  new  serviceError(
            e.message || 'Internal Service error',
            e.code || roleCodes.NOT_FOUND
        )
    }

}


module.exports={
    findById
}