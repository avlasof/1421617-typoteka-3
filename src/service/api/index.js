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

const router = new Router();

(async () => {
  const mockData = await getMockData();

  categories(router, new CategoryService(mockData));
  articles(router, new ArticleService(mockData), new CommentService());
  search(router, new SearchService(mockData));
})();

module.exports = router;
