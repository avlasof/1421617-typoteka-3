'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);
const {
  articleExist,
  articleValidator,
  commentValidator,
} = require(`../middlewares`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  // ресурс возвращает список объявлений
  route.get(`/`, (req, res) => {
    const categories = articleService.findAll();
    res.status(HTTP_CODE.SUCCESS)
      .json(categories);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    return res.status(HTTP_CODE.SUCCESS).json(article);
  });

  // создаёт новое объявление
  route.post(`/`, articleValidator, (req, res) => {
    const {body} = req;
    const article = articleService.create(body);

    return res.status(HTTP_CODE.SUCCESS).json(article);
  });

  // редактирует определённое объявление
  route.put(`/:articleId`, [articleValidator, articleExist(articleService)], (req, res) => {
    const {article} = res.locals;
    const {body} = req;
    const resArticle = articleService.update(article, body);

    return res.status(HTTP_CODE.SUCCESS).json(resArticle);
  });

  // удаляет определённое объявление
  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const resArticle = articleService.drop(article);

    return res.status(HTTP_CODE.SUCCESS).json(resArticle);
  });

  // создаёт новый комментарий
  route.post(`/:articleId/comments`, [commentValidator, articleExist(articleService)], (req, res) => {
    const {article} = res.locals;
    const {body} = req;
    const comment = commentService.create(article, body);

    return res.status(HTTP_CODE.SUCCESS).json(comment);
  });

  // удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const comment = commentService.drop(article, commentId);

    if (!comment) {
      return res.status(HTTP_CODE.NOT_FOUND).send(`Comment with ${commentId} not found`);
    }

    return res.status(HTTP_CODE.SUCCESS).json(comment);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res.status(HTTP_CODE.SUCCESS).json(comments);
  });
};
