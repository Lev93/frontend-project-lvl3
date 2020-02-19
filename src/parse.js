const parseRssItem = (item) => {
  const rssItem = {
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  };

  return rssItem;
};

const parse = (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data, 'text/xml');
  console.log(data);
  const items = data.querySelectorAll('item');
  const feed = {
    title: data.querySelector('title').textContent,
    link: data.querySelector('link').textContent,
    description: data.querySelector('description').textContent,
    items: Array.from(items).map(parseRssItem),
  };
  return feed;
};


export default parse;
