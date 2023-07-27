const COMMENTS_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureDetails = bigPicture.querySelector('.social__header');
const body = document.querySelector('body');
const cancelButton = bigPicture.querySelector('#picture-cancel');
const commentElement = bigPicture.querySelector('#comment');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');

let commentsCount = COMMENTS_PORTION;
let currentComments = [];
//Открывается и закрывается (часть 2)
const renderComments = () => {
  commentList.innerHTML = '';
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsShown = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_PORTION || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`;

  const fragment = document.createDocumentFragment();
  commentsShown.forEach((commentData) => {
    const { avatar, name, message } = commentData;
    const comment = commentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
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
  if (evt.key === 'Escape') {
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

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPictureDetails.querySelector('.likes-count').textContent = likes;
  bigPictureDetails.querySelector('.social__caption').textContent = description;

  currentComments = comments.slice();
  renderComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

export { showBigPicture };
