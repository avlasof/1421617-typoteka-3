'use strict';
const {nanoid} = require(`nanoid`);
const {MAX_LENGTH_ID} = require(`../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_LENGTH_ID), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(article) {
    this._articles = this._articles.filter((item) => item.id !== article.id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(oldArticle, newArticle) {
    return Object.assign(oldArticle, newArticle);
  }

}

module.exports = ArticleService;
