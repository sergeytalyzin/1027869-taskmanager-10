import AbstractComponent from "./abstract-component";

const getNoTasksTemplate = () => {
  return (
    `<section class="board container">    
        <p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
        </p>
    </section>`
  );
};


export default class NoTasks extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getNoTasksTemplate();
  }
}
