import AbstractComponent from "./abstract-component";

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

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getBoardTemplate();
  }
}
