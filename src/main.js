import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import BoardComponent from "./components/board.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import BoardController from './controllers/board.js';

import {render, RenderPosition} from "./utils/render.js";



const TASK_TIMES = 22;



const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();
// const boardComponent = new BoardComponent();
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
const tasks = generateTasks(TASK_TIMES);

const bordController = new BoardController();

bordController.render(tasks);

