'use strict';

const {Router} = require(`express`);
const router = new Router();

const handleRequest = (req, res) => {
  res.send(req.url);
};

router.get(`/`, handleRequest);
router.get(`/register`, handleRequest);
router.get(`/login`, handleRequest);
router.get(`/my`, handleRequest);
router.get(`/my/comments`, handleRequest);
router.get(`/articles/category/:id`, handleRequest);
router.get(`/articles/add`, handleRequest);
router.get(`/search`, handleRequest);
router.get(`/articles/edit/:id`, handleRequest);
router.get(`/articles/:id`, handleRequest);
router.get(`/categories`, handleRequest);

module.exports = router;
