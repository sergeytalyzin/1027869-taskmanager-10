import {MonthNames} from "../const";
import {formatTime} from "../utils/time";
import AbstractComponent from "./abstract-component";


const createHashtagsMarkup = (tags) => {
  return tags
    .map((tag) =>{
      return (
        `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
        #${tag}
        </span>
        </span>`);
    }).join(`\n`);
};

const getTaskTemplate = (task) => {
  const {description, tags, dueDate, color, repeatingDays, isFavorite, isArchive} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MonthNames[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? `${formatTime(dueDate)}` : ``;

  const hashtags = createHashtagsMarkup(Array.from(tags));
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${description} <br>
                  ${ isArchive ? `<img src="https://pbs.twimg.com/media/EKEtcNVXYAIQPTU.jpg" width="30" height="30"> ` : ``}
                    ${ isFavorite ? `<img src="https://favorit-motors.ru/bitrix/templates/favorit_motors_main_v2/assets/img/favorit-big.png" width="30" height="30"> ` : ``}
                  </p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${date}</span>
                          <span class="card__time">${time}</span>
                        </p>
                      </div>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                   ${hashtags}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }
  getTemplate() {
    return getTaskTemplate(this._task);
  }
  setEditButtonListener(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }
  setArchiveButtonListener(handler) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, handler);
  }
  setFavoritesButtonListener(handler) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, handler);
  }
}
