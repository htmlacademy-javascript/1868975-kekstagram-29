import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { loadData } from './fetch.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.zIndex = '100';
  messageAlert.style.left = '0';
  messageAlert.style.top = '0';
  messageAlert.style.right = '0';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '24px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.textContent = 'Не удалось загрузить данные';
  document.body.append(messageAlert);
};

loadData (onSuccess, onFail);
