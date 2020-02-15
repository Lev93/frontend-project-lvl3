import axios from 'axios';

const updateNews = (state) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const updateInterval = 5000;
  const promisesResponseList = state.urls.map((item) => axios.get(`${proxy}${item}`));

  const update = (response) => {
    const func = (item) => {
      const hasNews = state.news.find(({ link }) => link === item.link);
      return hasNews ? null : item;
    };

    const parser = new DOMParser();
    const data = parser.parseFromString(response.data, 'text/xml');
    const feed = {
      title: data.querySelector('title').textContent,
      link: data.querySelector('link').textContent,
      description: data.querySelector('description').textContent,
    };
    const newNews = [];
    data.querySelectorAll('item').forEach((item) => {
      const news = {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
      };
      newNews.push(news);
    });
    const hasFeed = state.feeds.find(({ title }) => title === feed.title);
    const currentnews = newNews.map(func).filter((item) => item !== null);
    if (!hasFeed) state.feeds.push(feed);
    state.news.unshift(...currentnews);
  };

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach(update);
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => setTimeout(() => updateNews(state), updateInterval));
};
export default updateNews;
