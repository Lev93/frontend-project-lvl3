import state from './state';

const parse = (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data, 'text/xml');
  const feed = {
    title: data.querySelector('title').textContent,
    link: data.querySelector('link').textContent,
    description: data.querySelector('description').textContent,
  };
  state.feeds.push(feed);
  data.querySelectorAll('item').forEach((item) => {
    const news = {
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
      description: item.querySelector('description').textContent,
    };

    state.news.push(news);
  });
};

export default parse;
