'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

module.exports = (app, service) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const {title} = req.query;
    const result = service.search(title);

    if (!title) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({message: `Bad request`});
    }

    if (!result.length) {
      return res.status(HTTP_CODE.SUCCESS).json([]);
    }

    return res.status(HTTP_CODE.SUCCESS).json(result);
  });

  return route;
};
