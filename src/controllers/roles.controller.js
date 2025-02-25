const createHttpError = require("http-errors");
const ServiceError = require("../utils/errors/service.error");
const roleService = require("../services/role.service");
const responseHandler = require("../handlers/response.handler");

const findAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.findAll();
    responseHandler(res, 200, "success", roles);
  } catch (e) {
    switch (e.code) {
      case ServiceError.NOT_FOUND:
        next(createHttpError(404, e.message));
        break;
      default:
        next(e);
    }
  }
};

const createRole = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const newRole = await roleService.create(id, name);
    responseHandler(res, 201, "success", newRole);
  } catch (e) {
    switch (e.code) {
      case ServiceError.ALREADY_EXISTS:
        next(createHttpError(409, e.message));
        break;
      default:
        next(e);
    }
  }
};

module.exports = {
  findAllRoles,
  createRole,
};
