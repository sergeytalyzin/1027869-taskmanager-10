import AbstractComponent from "./abstract-component";

const getLoadButtonTemplate = () => {
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getLoadButtonTemplate();
  }

  _setLoadMoreClickButton(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
