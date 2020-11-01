'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  search(key) {
    const result = this._articles.filter((article) => article.title.indexOf(key) !== -1);

    return result;
  }
}

module.exports = SearchService;
