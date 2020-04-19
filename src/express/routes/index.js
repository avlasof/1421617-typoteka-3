'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/`, (req, res) => res.render(`pages/main`));
router.get(`/register`, (req, res) => res.render(`pages/sign-up`));
router.get(`/login`, (req, res) => res.render(`pages/login`));
router.get(`/search`, (req, res) => res.render(`pages/search`));
router.get(`/categories`, (req, res) => res.render(`pages/all-categories`));
router.get(`/my`, (req, res) => res.render(`pages/my`));
router.get(`/my/comments`, (req, res) => res.render(`pages/comments`));
router.get(`/articles/category/:id`, (req, res) => res.render(`pages/articles-by-category`));
router.get(`/articles/add`, (req, res) => res.render(`pages/new-post`));
router.get(`/articles/edit/:id`, (req, res) => res.render(`pages/post`));
router.get(`/articles/:id`, (req, res) => res.render(`pages/post`));

module.exports = router;
