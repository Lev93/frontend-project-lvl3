import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';
import { renderFeeds, renderNews } from './render';

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

const addRss = () => {
  const form = document.querySelector('#rss-form');
  const inputField = document.querySelector('#rss-input');
  const inputMessage = document.querySelector('#rss-note');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.urls.push(inputField.value);
    state.formState = 'requesting';
  });
  watch(state, 'formState', () => {
    if (state.formState === 'waiting') {
      inputMessage.textContent = 'Введите URL';
      inputMessage.classList.remove('text-warning', 'text-danger', 'text-success');
      state.feeds = [];
      state.news = [];
    } else if (state.formState === 'requesting') {
      inputMessage.textContent = 'Запрос на сервер';
      inputMessage.classList.add('text-warning');
      sendRequest();
    } else if (state.formState === 'finished') {
      inputMessage.textContent = 'Канал добавлен';
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-success');
      inputField.value = '';
      state.currentInputState = 'empty';
      renderFeeds();
      renderNews();
    } else {
      inputMessage.textContent = 'Канал не существует или проблемы с сетью.';
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-danger');
    }
  });
};

export default addRss;
