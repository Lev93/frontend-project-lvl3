import 'bootstrap/js/dist/modal';
import validate from './validate';
import addRss from './addRss';
import { appendModalDesc } from './render';

export default () => {
  validate();
  addRss();
  appendModalDesc();
};
