import axios from 'axios';
import parse from './parse';

const updateState = (state, data) => {
  const func = (item) => {
    const hasNews = state.news.find(({ link }) => link === item.link);
    return hasNews ? null : item;
  };

  const feed = parse(data);
  const hasFeed = state.feeds.find(({ title }) => title === feed.title);
  const currentnews = feed.items.map(func).filter((item) => item !== null);
  if (!hasFeed) state.feeds.push(feed);
  state.news.unshift(...currentnews);
};

const startAutopdateOfAddedNews = (state) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const updateInterval = 5000;
  const promisesResponseList = state.urls.map((item) => axios.get(`${proxy}${item}`));

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach((response) => updateState(state, response.data));
    })
    .finally(() => setTimeout(() => startAutopdateOfAddedNews(state), updateInterval));
};
export default startAutopdateOfAddedNews;
