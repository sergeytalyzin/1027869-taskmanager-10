import {createElement} from "../util";

const getSortTemplate = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
