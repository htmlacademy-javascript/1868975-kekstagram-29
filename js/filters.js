import { debounce, shuffleArray } from './utils.js';
import { renderThumbnails, removeThumbnails } from './thumbnails.js';
import { photos } from './main.js';

const COUNT_OF_FILTER = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const thumbnailsFilters = document.querySelector('.img-filters');
const thumbnailsFiltersForm = thumbnailsFilters.querySelector('.img-filters__form');

const filters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice()).slice(0, COUNT_OF_FILTER),
  'filter-discussed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length),
};

const isFilterButton = (evt) => evt.target.tagName === 'BUTTON';

const onThumbnailsFiltersFormClick = debounce((evt) => {
  if (isFilterButton(evt)) {
    removeThumbnails();
    renderThumbnails(filters[evt.target.id]());
  }
});

const onFilterButtonClick = (evt) => {
  if (isFilterButton(evt)) {
    const activeFilter = thumbnailsFiltersForm.querySelector(`.${ACTIVE_CLASS}`);
    if (activeFilter) {
      activeFilter.classList.remove(ACTIVE_CLASS);
    }
    evt.target.classList.add(ACTIVE_CLASS);
  }
};


thumbnailsFiltersForm.addEventListener('click', onThumbnailsFiltersFormClick);
thumbnailsFiltersForm.addEventListener('click', onFilterButtonClick);

