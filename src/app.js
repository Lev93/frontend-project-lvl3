import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import axios from 'axios';
import isURL from 'validator/lib/isURL';
import parse from './parse';
import localize from './locales';
import startAutopdateOfAddedNews from './requests';
import watch from './watch';
import translateStartpage from './locales/translateStartPage';

const app = () => {
  const state = {
    currentInputState: 'empty',
    formState: 'waiting',
    urls: [],
    feeds: [],
    news: [],
  };
  const form = document.querySelector('#rss-form');
  const inputField = document.querySelector('#rss-input');
  watch(state);
  startAutopdateOfAddedNews(state);
  localize(translateStartpage);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = inputField.value;
    state.formState = 'requesting';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    axios.get(`${proxy}${url}`)
      .then((response) => {
        const feed = parse(response.data);
        state.feeds.push(feed);
        state.news.unshift(...feed.items);
        state.urls.push(url);
        state.currentInputStatet = 'empty';
        state.formState = 'finished';
      })
      .catch((e) => {
        state.formState = 'failed';
        throw e;
      });
  });
  inputField.addEventListener('input', (event) => {
    const { value } = event.target;
    const isValidUrl = isURL(value) && !state.urls.find((item) => item === value);
    state.formState = 'waiting';

    if (value === '') {
      state.currentInputState = 'empty';
    } else if (isValidUrl) {
      state.currentInputState = 'valid';
    } else {
      state.currentInputState = 'invalid';
    }
  });

  $('#infoModal').on('show.bs.modal', function append(event) {
    const button = $(event.relatedTarget);
    const recipient = button.data('whatever');
    const modal = $(this);
    modal.find('#description').text(recipient);
  });
};

export default app;
