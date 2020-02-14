import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';
import { renderFeeds, renderNews } from './render';
import localize from './locales';

const sendRequest = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const promisesResponseList = state.urls.map((item) => axios.get(`${proxy}${item}`));

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach(parse);
      state.formState = 'finished';
    })
    .catch((e) => {
      state.formState = 'failed';
      throw e;
    });
};

const translateStartpage = (t) => {
  const title = document.querySelector('#title');
  const description = document.querySelector('#rss-description');
  const channels = document.querySelector('#rss-channels');
  const articles = document.querySelector('#rss-articles');
  const inputField = document.querySelector('#rss-input');
  const inputMessage = document.querySelector('#rss-note');
  const buttonAdd = document.querySelector('#rss-btn');
  const buttonClose = document.querySelector('#rss-close');
  const infoButtons = document.querySelectorAll('.btn-info');
  for (let i = 0; i < infoButtons.length; i += 1) {
    infoButtons[i].textContent = t('button.info');
  }
  title.textContent = t('title');
  description.textContent = t('description');
  channels.textContent = t('channels');
  articles.textContent = t('articles');
  inputField.placeholder = t('placeholder');
  inputMessage.textContent = t('inputMessage.waiting');
  buttonAdd.textContent = t('button.add');
  buttonClose.textContent = t('button.close');
};

const addRss = () => {
  const form = document.querySelector('#rss-form');
  const inputField = document.querySelector('#rss-input');
  const inputMessage = document.querySelector('#rss-note');
  localize(translateStartpage);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.urls.push(inputField.value);
    state.formState = 'requesting';
  });
  watch(state, 'formState', () => {
    if (state.formState === 'waiting') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.waiting');
      });
      inputMessage.classList.remove('text-warning', 'text-danger', 'text-success');
      state.feeds = [];
      state.news = [];
    } else if (state.formState === 'requesting') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.request');
      });
      inputMessage.classList.add('text-warning');
      sendRequest();
    } else if (state.formState === 'finished') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.succes');
      });
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-success');
      inputField.value = '';
      state.currentInputState = 'empty';
      renderFeeds();
      renderNews();
      localize(translateStartpage);
    } else {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.error');
      });
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-danger');
    }
  });
};

export default addRss;
