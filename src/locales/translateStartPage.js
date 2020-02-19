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

export default translateStartpage;
