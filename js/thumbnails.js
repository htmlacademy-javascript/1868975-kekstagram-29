import { showBigPicture } from './big-picture';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (post) => {
  const { comments, description, likes, url } = post;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  const onThumbnailClick = (evt) => {
    evt.preventDefault();
    showBigPicture(post);
  };

  thumbnail.addEventListener('click', onThumbnailClick);

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
};

export { renderThumbnails };
