const userService = require('../services/user.service');
const responseHandle=require('../handlers/response.handler');

const assignRole = async(req, res,next)=>{
    try{
        const {userId, roleId}=req.body
        const user = req.user
        
        await userService.assignRole(roleId, userId, user.id);
        responseHandle(res, 201, 'success', 'role editado con exito')
    }catch(e){
        next(e)
    }
}

module.exports={
    assignRole
}