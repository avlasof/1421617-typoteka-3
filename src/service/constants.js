'use strict';
module.exports = {
  CLI_DEFAULT_COMMAND: `--help`,
  CLI_ARGS_INDEX: 2,
  DEFAULT_PORT: 3000,
  HTTP_CODE: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  },

  DATA_DIR: `./data/`,
  DATA_TITLES_FILE_NAME: `titles.txt`,
  DATA_SENTENCES_FILE_NAME: `sentences.txt`,
  DATA_CATEGORIES_FILE_NAME: `categories.txt`,
  DATA_COMMENTS_FILE_NAME: `comments.txt`,

  FILE_SIZE_MIN: 1,
  FILE_SIZE_MAX: 1000,
  FILE_NAME: `mocks.json`,
  MAX_NUM_ANNOUNCE: 1,
  MAX_NUM_TEXT: 5,
  MAX_NUM_DAYS: 3,
  MAX_NUM_COMMENTS: 4,
  MAX_LENGTH_ID: 6,
  MONTH_MILLISECONDS: 2592000000,
  EXIT_CODE: {
    SUCCESS: 0,
    ERROR: 1
  }
};
