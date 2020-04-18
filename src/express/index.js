'use strict';

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);

const {DEFAULT_PORT, PUBLIC_DIR, TEMPLATES_DIR} = require(`./constants`);

const indexRouter = require(`./routes`);
const cabinetRouter = require(`./routes/cabinet`);
const articlesRouter = require(`./routes/articles`);

const app = express();

app
  .use(`/`, indexRouter)
  .use(`/my`, cabinetRouter)
  .use(`/articles`, articlesRouter)

  .use(express.static(path.resolve(__dirname, PUBLIC_DIR)))

  .use((req, res) => res.status(400).render(`errors/400`))
  .use((err, req, res, next) => res.status(500).render(`errors/500`))

  .set(`views`, path.resolve(__dirname, TEMPLATES_DIR))
  .set(`view engine`, `pug`)

  .listen(DEFAULT_PORT, () => console.log(chalk`{blue Сервер работает на http://localhost:${DEFAULT_PORT}}`));
