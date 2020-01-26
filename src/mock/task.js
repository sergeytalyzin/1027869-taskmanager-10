import {Colors} from '../const.js';

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'su': false,
  'sa': false
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];


const getRandomNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length);

  return array[index];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': Math.random() > 0.5,
  });
};

const generateTags = (tags) => {
  return tags.filter(() => Math.random() > 0.5);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    description: getRandomItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomItem(Colors),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTasks, generateTask};


