const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN :
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND :
      container.append(element);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {

  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;
  const newElement = newComponent.getElement();

  if (parentElement && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


export {createElement, render, remove, replace, RenderPosition};
