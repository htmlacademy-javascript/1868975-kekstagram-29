import { getRandomInteger, getRandomArrayElement } from './utils.js';

const DESCRIPTIONS = [
  'Удачный кадр',
  'Лучшая фотография',
  'Самая хорошая фотография',
  'А эта ещё лучше'
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const POSTS_AMOUNT = 25;
const likesAmount = {
  MIN: 15,
  MAX: 200
};
const commentsAmount = {
  MIN: 0,
  MAX: 30
};
const avatarsAmount = {
  MIN: 1,
  MAX: 6
};

const posts = [];

let currentId = 0;
const generateCommentId = () => {
  currentId += 1;
  return currentId;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarsAmount.MIN, avatarsAmount.MAX)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPost = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(likesAmount.MIN, likesAmount.MAX),
  comments: Array.from(
    {length: getRandomInteger(commentsAmount.MIN, commentsAmount.MAX)},
    createComment,
  ),
});

const createPosts = () => {
  for (let i = 1; i <= POSTS_AMOUNT; i++) {
    posts.push(createPost(i));
  }
  return posts;
};

export { createPosts };
