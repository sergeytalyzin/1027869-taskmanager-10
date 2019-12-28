import {render, remove, RenderPosition, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import BoardComponent from "../components/board.js";
import Sort, {SortType} from "../components/sort";

const ESCAPE_KEY = 27;
const TASK_BUTTON = 4;
const TASK_INDICATOR = 8;

const renderTask = (element, task) => {
  const onEscKeyDown = (evt) => {
    if (evt.keyCode === ESCAPE_KEY) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };
  const onEscPress = () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);


  taskComponent.setEditButtonListener(replaceTaskToEdit);
  taskComponent.setEditButtonListener(onEscPress);
  taskEditComponent.setFormSubmitListener(replaceEditToTask);

  render(element, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTasks = (element, tasks) => {
  tasks.forEach((task) => {
    renderTask(element, task);
  });
};

export default class BoardController {
  constructor() {
    this._noTasksComponent = new NoTasksComponent();
    this._boardComponent = new BoardComponent();
    this._sortComponent = new Sort();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }
      render(this._boardComponent.getElement(), this._loadMoreButtonComponent.getElement());
      this._loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
        const prevTaskShowing = showingTasksCount;
        showingTasksCount = showingTasksCount + TASK_BUTTON;
        renderTasks(siteBoardElements, tasks.slice(prevTaskShowing, showingTasksCount));
        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };
    const siteMainElement = document.querySelector(`.main`);

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(siteMainElement, this._noTasksComponent.getElement());
    }
    render(siteMainElement, this._boardComponent.getElement());
    render(this._boardComponent.getElement(), this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    const siteBoardElements = this._boardComponent.getElement().querySelector(`.board__tasks`);

    let showingTasksCount = TASK_INDICATOR;
    renderTasks(siteBoardElements, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP :
          sortedTasks = tasks.slice().sort((a,b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN :
          sortedTasks = tasks.slice().sort((a,b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          sortedTasks = tasks.slice(0, showingTasksCount);
          break;
      }
      siteBoardElements.innerHTML = ``;
      renderTasks(siteBoardElements,sortedTasks);
      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
