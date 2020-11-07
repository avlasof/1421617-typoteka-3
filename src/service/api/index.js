'use strict';

const {Router} = require(`express`);
const categories = require(`./categories`);
const articles = require(`./articles`);
const search = require(`./search`);

const {getMockData} = require(`../lib/get-mock-data`);
const {
  CategoryService,
  ArticleService,
  CommentService,
  SearchService
} = require(`../data-service`);

const routes = async () => {
  const router = new Router();
  const mockData = await getMockData();

  router.use(`/categories`, categories(new CategoryService(mockData)));
  router.use(`/articles`, articles(new ArticleService(mockData), new CommentService()));
  router.use(`/search`, search(router, new SearchService(mockData)));

  return router;
};

module.exports = routes;
