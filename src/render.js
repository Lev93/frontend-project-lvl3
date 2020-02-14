import $ from 'jquery';
import state from './state';

const feedsList = document.querySelector('#rss-feeds');
const newsList = document.querySelector('#rss-news');

export const renderFeeds = () => {
  const render = ({ title, link, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-primary">
      <a href=${link} class="text-light">${title}</a>
      <button type="button" class="btn btn-info ml-2" data-toggle="modal" data-target="#infoModal" data-whatever='${description}'></button>
    </li>`
  );
  newsList.innerHTML = state.news.map(render).join('');
};

export const renderNews = () => {
  const render = ({ title, link, description }) => (
    `<a href=${link} class="list-group-item flex-column align-items-start bg-dark">
      <h6 class="mb-2 font-weight-bold text-uppercase text-light">${title}</h6>
      <small class="text-light">${description}</small>
    </a>`);

  feedsList.innerHTML = state.feeds.map(render).join('');
};

export const appendModalDesc = () => $('#infoModal').on('show.bs.modal', function append(evt) {
  const button = $(evt.relatedTarget);
  const recipient = button.data('whatever');
  const modal = $(this);
  modal.find('#description').text(recipient);
});
