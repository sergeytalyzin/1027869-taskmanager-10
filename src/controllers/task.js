import {render, RenderPosition, replace} from "../utils/render";
import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";

const ESCAPE_KEY = 27;
const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(element, onDataChange, onViewChange) {
    this._element = element;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._replaceEditToTask = this._replaceEditToTask.bind(this);
    this._replaceTaskToEdit = this._replaceTaskToEdit.bind(this);
  }
  render(task) {
    const onEscKeyDown = (evt) => {
      if (evt.keyCode === ESCAPE_KEY) {
        this._replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    const onEscPress = () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);
    const taskComponent = this._taskComponent;
    const taskEditComponent = this._taskEditComponent;


    taskComponent.setEditButtonListener(this._replaceTaskToEdit);
    taskComponent.setEditButtonListener(onEscPress);
    taskEditComponent.setFormSubmitListener(this._replaceEditToTask);

    taskComponent.setArchiveButtonListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isArchive: !task.isArchive}));
    });
    taskComponent.setFavoritesButtonListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isFavorite: !task.isFavorite}));
    });
    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._element, taskComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }
  _replaceTaskToEdit() {
    this._onViewChange();

    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }
  _replaceEditToTask() {
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }
}
