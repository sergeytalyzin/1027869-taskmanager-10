import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import BoardComponent from "./components/board.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import {render, RenderPosition} from "./util";


const TASK_TIMES = 22;
const TASK_INDICATOR = 8;
const TASK_BUTTON = 4;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    siteBoardElements.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editFrom = taskEditComponent.getElement().querySelector(`form`);
  editFrom.addEventListener(`submit`, () => {
    siteBoardElements.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(siteBoardElements, taskComponent.getElement(), RenderPosition.BEFOREEND);
};
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
const boardComponent = new BoardComponent();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const siteBoardElements = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_TIMES);

let showingTasksCount = TASK_INDICATOR;

tasks.slice(0, showingTasksCount).forEach((task) => {
  renderTask(task);
});
const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = siteMainElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskShowing = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_BUTTON;
  tasks.slice(prevTaskShowing, showingTasksCount).forEach((task) => renderTask(task));
  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
