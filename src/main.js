import {getBoardTemplate} from "./components/board.js";
import {getMenuTemplate} from "./components/menu";
import {getFilterTemplate} from "./components/filter";
import {getLoadButtonTemplate} from "./components/load-more-button";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";


const TASK_TIMES = 22;
const TASK_INDICATOR = 8;
const TASK_BUTTON = 4;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getMenuTemplate());

const filters = generateFilters();
render(siteMainElement, getFilterTemplate(filters));
render(siteMainElement, getBoardTemplate());

const siteBoardElements = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_TIMES);

render(siteBoardElements, getTaskEditTemplate(tasks[0]));
let showingTasksCount = TASK_INDICATOR;

tasks.slice(1, showingTasksCount).forEach((task) => render(siteBoardElements, getTaskTemplate(task)));
const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, getLoadButtonTemplate());

const loadMoreButton = siteMainElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskShowing = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_BUTTON;
  tasks.slice(prevTaskShowing, showingTasksCount).forEach((task) => render(siteBoardElements, getTaskTemplate(task)));
  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
