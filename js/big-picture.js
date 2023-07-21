const bigPicture = document.querySelector('.big-picture');
const bigPictureDetails = bigPicture.querySelector('.big-picture__social');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');
const cancelButton = bigPicture.querySelector('#picture-cancel');
const commentElement = bigPicture.querySelector('#comment');
const caption = bigPicture.querySelector('.social__caption');

const createComment = (commentData) => {
  const { avatar, name, message } = commentData;
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
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

  bigPictureDetails.querySelector('.social__picture').src = url;
  likesCount.textContent = likes;
  commentCount.textContent = comments.length;
  caption.textContent = description;

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

export {showBigPicture};
