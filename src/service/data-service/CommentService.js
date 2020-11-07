'use strict';
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article, text) {
    const comment = {id: nanoid(MAX_ID_LENGTH), text};
    article.comments = [...article.comments, comment];

    return comment;
  }

  drop(article, commentId) {
    const {comments = []} = article;
    const commentIndex = comments.findIndex((item) => item.id === commentId);

    if (commentIndex === -1) {
      return null;
    }

    return article.comments.splice(commentIndex, 1);
  }

  findAll(article) {
    const {comments = []} = article;

    return comments;
  }
}

module.exports = CommentService;
