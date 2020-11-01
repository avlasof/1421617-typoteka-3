'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const format = require(`date-fns/format`);
const {nanoid} = require(`nanoid`);


const {
  DATA_DIR, DATA_TITLES_FILE_NAME, DATA_SENTENCES_FILE_NAME, DATA_CATEGORIES_FILE_NAME, DATA_COMMENTS_FILE_NAME,
  FILE_SIZE_MIN, FILE_SIZE_MAX, FILE_NAME,
  MAX_NUM_ANNOUNCE, MAX_NUM_TEXT, MAX_NUM_DAYS, MONTH_MILLISECONDS,
  MAX_NUM_COMMENTS,
  MAX_LENGTH_ID,
  EXIT_CODE
} = require(`../constants`);
const {getRandomIntInclusive, shuffleArray} = require(`../utils`);

const messageType = {
  error: {
    tooMuch: `Не больше ${FILE_SIZE_MAX} объявлений`
  },
  success: chalk`{green Данные соханены в файл {underline ${FILE_NAME}}}`
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_LENGTH_ID),
    text: shuffleArray(comments)
      .slice(0, getRandomIntInclusive(1, 3))
      .join(` `),
  }))
);

const generateList = (count, titleList, descriptionList, categoryList, commentList) => {
  const createdDateMax = Date.now();
  const createdDateMin = createdDateMax - MAX_NUM_DAYS * MONTH_MILLISECONDS;

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_LENGTH_ID),
    title: titleList[getRandomIntInclusive(0, titleList.length - 1)],
    announce: shuffleArray(descriptionList).slice(0, MAX_NUM_ANNOUNCE).join(` `),
    fullText: shuffleArray(descriptionList).slice(0, MAX_NUM_TEXT).join(` `),
    createdDate: format(getRandomIntInclusive(createdDateMin, createdDateMax), `yyyy-MM-dd HH:mm:ss`),
    category: Array(getRandomIntInclusive(0, categoryList.length - 1)).fill().map((item, index) => categoryList[index]),
    comments: generateComments(getRandomIntInclusive(1, MAX_NUM_COMMENTS), commentList),
  }));
};

const sendMessage = (error) => {
  if (error) {
    console.log(chalk.red(error));
    return;
  }

  console.log(messageType.success);
};

const readFile = async (fileName) => {
  try {
    const text = await fs.readFile(DATA_DIR + fileName, `utf8`);
    return text.trim().split(`\n`);
  } catch (err) {
    sendMessage(err);
    return [];
  }
};

const saveFile = async (data) => {
  try {
    await fs.writeFile(FILE_NAME, data);
    sendMessage();
  } catch (err) {
    sendMessage(err);
    process.exitCode = EXIT_CODE.ERROR;
  }
};

const run = async (count) => {
  count = Number(count) || FILE_SIZE_MIN;

  if (count > FILE_SIZE_MAX) {
    sendMessage(messageType.error.tooMuch);
    process.exitCode = EXIT_CODE.ERROR;
    return;
  }

  const titleList = await readFile(DATA_TITLES_FILE_NAME);
  const descriptionList = await readFile(DATA_SENTENCES_FILE_NAME);
  const categoryList = await readFile(DATA_CATEGORIES_FILE_NAME);
  const commentList = await readFile(DATA_COMMENTS_FILE_NAME);
  const data = JSON.stringify(generateList(count, titleList, descriptionList, categoryList, commentList));

  saveFile(data);
};

module.exports = {
  run
};
