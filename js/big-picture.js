import { isEscapeKey } from './utils.js';

const COMMENTS_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureDetails = bigPicture.querySelector('.social__header');
const body = document.querySelector('body');
const cancelButton = bigPicture.querySelector('#picture-cancel');
const commentItem = bigPicture.querySelector('#comment');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

let commentsCount = COMMENTS_PORTION;
let currentComments = [];

const renderComments = () => {
  commentList.innerHTML = '';
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsShown = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_PORTION || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  const fragment = document.createDocumentFragment();
  commentsShown.forEach((commentData) => {
    const { avatar, name, message } = commentData;
    const comment = commentItem.cloneNode(true);
    const userpic = comment.querySelector('.social__picture');

    userpic.src = avatar;
    userpic.alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.append(comment);
  });
  commentList.appendChild(fragment);
};

const onCommentsLoaderClick = () => {
  commentsCount += COMMENTS_PORTION;
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsCount = COMMENTS_PORTION;
  currentComments = [];
};

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const showBigPicture = (post) => {
  const { comments, description, likes, url } = post;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  const pic = bigPicture.querySelector('.big-picture__img img');

  pic.src = url;
  pic.alt = description;
  bigPictureDetails.querySelector('.likes-count').textContent = likes;
  bigPictureDetails.querySelector('.social__caption').textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

export { showBigPicture };
