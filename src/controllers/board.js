import {render, remove, RenderPosition, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import BoardComponent from "../components/board.js";

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

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);


  taskComponent.setButtonListener(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setButtonSubmitListener(replaceEditToTask);

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
    const siteBoardElements = this._boardComponent.getElement().querySelector(`.board__tasks`);

    let showingTasksCount = TASK_INDICATOR;
    renderTasks(siteBoardElements, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();
  }
}
