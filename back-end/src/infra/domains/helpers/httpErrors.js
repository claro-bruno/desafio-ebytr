const { StatusCodes } = require('http-status-codes');

module.exports = {
  badRequest: (message) => ({
    status: StatusCodes.BAD_REQUEST,
    message,
  }),

  unauthorized: (message) => ({
    status: StatusCodes.UNAUTHORIZED,
    message,
  }),

  notFound: (entity) => ({
    status: StatusCodes.NOT_FOUND,
    message: `${entity} not found`,
  }),

  conflict: (entity) => ({
    status: StatusCodes.CONFLICT,
    message: `${entity} already registred`,
  }),
};
