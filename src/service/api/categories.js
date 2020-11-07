'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

module.exports = (service) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HTTP_CODE.SUCCESS).json(categories);
  });

  return route;
};
