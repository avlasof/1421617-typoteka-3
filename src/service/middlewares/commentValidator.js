'use strict';
const {HTTP_CODE} = require(`../constants`);
const articleKeys = [`text`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HTTP_CODE.BAD_REQUEST)
      .json({message: `Bad request`});
  }

  return next();
};
