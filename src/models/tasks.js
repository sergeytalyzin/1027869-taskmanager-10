export default class Tasks {
  constructor() {
    this._tasks = [];
  }

  getTasks() {
    return this._tasks;
  }
  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));

    return true;
  }
}
