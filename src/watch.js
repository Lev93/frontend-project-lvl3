import { watch } from 'melanke-watchjs';
import localize from './locales';
import { renderFeeds, renderNews } from './render';
import translateStartpage from './locales/translateStartPage';

export default (state) => {
  const form = document.querySelector('#rss-form');
  const inputField = form.querySelector('#rss-input');
  const inputMessage = document.querySelector('#rss-note');
  const button = form.querySelector('#rss-btn');

  watch(state, 'currentInputState', () => {
    if (state.currentInputState === 'empty') {
      inputField.classList.remove('is-invalid');
      button.classList.add('disabled');
      button.setAttribute('disabled', 'disabled');
    } else if (state.currentInputState === 'valid') {
      inputField.classList.remove('is-invalid');
      button.classList.remove('disabled');
      button.removeAttribute('disabled');
    } else {
      inputField.classList.add('is-invalid');
      button.classList.add('disabled');
      button.setAttribute('disabled', 'disabled');
    }
  });

  watch(state, 'formState', () => {
    if (state.formState === 'waiting') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.waiting');
      });
      inputMessage.classList.remove('text-warning', 'text-danger', 'text-success');
    } else if (state.formState === 'requesting') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.request');
      });
      inputMessage.classList.add('text-warning');
      button.classList.add('disabled');
      button.setAttribute('disabled', 'disabled');
      inputField.setAttribute('disabled', 'disabled');
    } else if (state.formState === 'finished') {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.succes');
      });
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-success');
      button.classList.remove('disabled');
      button.removeAttribute('disabled');
      inputField.removeAttribute('disabled');
    } else {
      localize((t) => {
        inputMessage.textContent = t('inputMessage.error');
      });
      inputMessage.classList.remove('text-warning');
      inputMessage.classList.add('text-danger');
      button.classList.remove('disabled');
      button.removeAttribute('disabled');
      inputField.removeAttribute('disabled');
    }
  });
  watch(state, 'feeds', () => {
    renderFeeds(state.feeds);
  });
  watch(state, 'news', () => {
    renderNews(state.news);
    localize(translateStartpage);
  });
};
