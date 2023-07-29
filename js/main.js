import { createPosts } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

renderThumbnails(createPosts());
