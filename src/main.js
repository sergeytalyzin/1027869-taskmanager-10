import {getBoardTemplate} from "./components/board.js";
import {getMenuTemplate} from "./components/menu";
import {getFilterTemplate} from "./components/filter";
import {getLoadButtonTemplate} from "./components/load-more-button";
import {getTaskEditTemplate} from "./components/task-edit";
import {getTaskTemplate} from "./components/task";

const TASK_TIMES = 3;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getMenuTemplate());
render(siteMainElement, getFilterTemplate());
render(siteMainElement, getBoardTemplate());

const siteBoardElements = siteMainElement.querySelector(`.board__tasks`);
render(siteBoardElements, getTaskEditTemplate());

new Array(TASK_TIMES).fill(``).forEach(() => render(siteBoardElements, getTaskTemplate()));

const boardElement = siteMainElement.querySelector(`.board`);

render(boardElement, getLoadButtonTemplate());
