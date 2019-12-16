import {createElement} from "../util";

const getBoardTemplate = () => {
  return (
    `<section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>

        <div class="board__tasks"></div>
    </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
