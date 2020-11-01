'use strict';
const {HTTP_CODE} = require(`../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    return res.status(HTTP_CODE.NOT_FOUND)
      .send(`article with ${articleId} not found`);
  }

  res.locals.article = article;
  return next();
};
