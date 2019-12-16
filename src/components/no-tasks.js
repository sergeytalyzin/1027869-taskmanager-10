import {createElement} from '../util.js';

const getNoTasksTemplate = () => {
  return (
    `<section class="board container">    
        <p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
        </p>
    </section>`
  );
};


export default class NoTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getNoTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
