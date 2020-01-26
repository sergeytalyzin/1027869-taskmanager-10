import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import BoardController from './controllers/board.js';
import {render, RenderPosition} from "./utils/render.js";
import TasksModel from "./models/tasks";

const TASK_TIMES = 22;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
const tasks = generateTasks(TASK_TIMES);

const taskModel = new TasksModel();
taskModel.setTasks(tasks);




const bordController = new BoardController(taskModel);
bordController.render();

