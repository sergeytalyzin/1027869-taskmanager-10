import {render, remove, RenderPosition} from "../utils/render";
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasksComponent from '../components/no-tasks.js';
import BoardComponent from "../components/board.js";
import Sort, {SortType} from "../components/sort";
import TaskController from "./task";

const TASK_BUTTON = 4;
const TASK_INDICATOR = 8;


const renderTasks = (element, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(element, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

export default class BoardController {
  constructor(tasksModel) {
    this._tasksModel = tasksModel;

    this._showedTaskControllers = [];
    this._noTasksComponent = new NoTasksComponent();
    this._boardComponent = new BoardComponent();
    this._sortComponent = new Sort();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._showingTasksCount = TASK_INDICATOR;
    this._siteBoardElements = null;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    const tasks = this._tasksModel.getTasks();

    const siteMainElement = document.querySelector(`.main`);

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(siteMainElement, this._noTasksComponent.getElement());
    }
    render(siteMainElement, this._boardComponent.getElement());
    render(this._boardComponent.getElement(), this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._siteBoardElements = this._boardComponent.getElement().querySelector(`.board__tasks`);


    const newTasks = renderTasks(this._siteBoardElements, tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }
  _onSortTypeChange(sortType) {
    let sortedTasks = [];
    const tasks = this._tasksModel.getTasks();
    
    switch (sortType) {
      case SortType.DATE_UP :
        sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN :
        sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = tasks.slice(0, this._showingTasksCount);
        break;
    }
    this._siteBoardElements.innerHTML = ``;
    renderTasks(this._siteBoardElements, sortedTasks, this._onDataChange);
    const newTasks = renderTasks(this._siteBoardElements, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }
    render(this._boardComponent.getElement(), this._loadMoreButtonComponent.getElement());
    this._loadMoreButtonComponent._setClickLoadMore(() => {
      const prevTaskShowing = this._showingTasksCount;
      this._showingTasksCount = this._showingTasksCount + TASK_BUTTON;
      const newTasks = renderTasks(this._siteBoardElements, this._tasksModel.getTasks().slice(prevTaskShowing, this._showingTasksCount), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
      if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {

      taskController.render(newData);
    }
  }
  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}
