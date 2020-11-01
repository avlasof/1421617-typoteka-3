'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HTTP_CODE, FILE_NAME} = require(`../constants`);
const routes = require(`../api`);

const app = express();

const getPosts = async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf8`);
    const mockList = JSON.parse(fileContent);

    res.json(mockList);
  } catch (err) {
    res.json([]);
  }
};

const run = (port) => {
  port = port || DEFAULT_PORT;

  app
    .use(express.json())
    .use(`/api`, routes)
    .get(`/posts`, getPosts)
    .use((req, res) => res.status(HTTP_CODE.NOT_FOUND).send(`Not found`))
    .listen(port, () => console.log(chalk`{blue Сервер работает на http://localhost:${port}}`));
};

module.exports = {
  run
};
