'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));
router.get(`/add`, (req, res) => res.render(`pages/new-post`));
router.get(`/edit/:id`, (req, res) => res.render(`pages/post`));
router.get(`/:id`, (req, res) => res.render(`pages/post`));

module.exports = router;
