import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import BoardComponent from "./components/board.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import {render, RenderPosition} from "./util";
import NoTasksComponent from './components/no-tasks.js';


const TASK_TIMES = 22;
const TASK_INDICATOR = 8;
const TASK_BUTTON = 4;
const ESCAPE_KEY = 27;

const renderTask = (element, task) => {
  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESCAPE_KEY) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceTaskToEdit = () => {
    element.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    element.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editFrom = taskEditComponent.getElement().querySelector(`form`);
  editFrom.addEventListener(`submit`, replaceEditToTask);

  render(element, taskComponent.getElement(), RenderPosition.BEFOREEND);
};
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
const boardComponent = new BoardComponent();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);



const tasks = generateTasks(TASK_TIMES);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  render(siteMainElement, new NoTasksComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
  const siteBoardElements = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = TASK_INDICATOR;

  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(siteBoardElements, task);
    });
  render(boardComponent.getElement(), new LoadMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteMainElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTaskShowing = showingTasksCount;
    showingTasksCount = showingTasksCount + TASK_BUTTON;
    tasks.slice(prevTaskShowing, showingTasksCount).forEach((task) => renderTask(siteBoardElements, task));
    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
