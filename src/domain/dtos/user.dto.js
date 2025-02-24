const mapUser = (user) => {
    console.log(user.Roles)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.Roles.map((role) => role.rol),
  };
};

module.exports = mapUser;
