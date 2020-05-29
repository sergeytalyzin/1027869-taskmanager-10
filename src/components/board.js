import AbstractComponent from "./abstract-component";

const getBoardTemplate = () => {
  return (
    `<section class="board container">
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
