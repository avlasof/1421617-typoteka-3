'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/`, (req, res) => res.render(`pages/my`));
router.get(`/comments`, (req, res) => res.render(`pages/comments`));
module.exports = router;
