//DTO utilizado para mapear un usuario
//se mapea el usuario con los roles
const mapUser = (user) => {

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.Roles.map((role) => role.rol),
  };
};

module.exports = mapUser;
