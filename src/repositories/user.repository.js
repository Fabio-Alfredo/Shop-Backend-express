const {User} = require('../models');

const create = async (user)=>{
    const newUser = await User.create(user);
    return newUser
}

module.exports={
    create
}