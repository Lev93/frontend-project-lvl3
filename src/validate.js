import isURL from 'validator/lib/isURL';
import { watch } from 'melanke-watchjs';
import state from './state';

const validate = () => {
  const inputField = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-btn');

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
};

export default validate;
