import { toPx } from './convert';

export const getDraggableData = (element: HTMLElement) => {
  const origin = element.closest('[data-droppable]') as HTMLElement;
  if (!origin) throw new Error('No droppable origin!');

  const { width, height } = element.getBoundingClientRect();

  return {
    element,
    origin,
    width,
    height,
  };
};

const createDivToSize = (width: number, height: number) => {
  const div = document.createElement('div');
  div.style.width = toPx(width);
  div.style.height = toPx(height);
  return div;
};

export function positionElementUnderCursor(
  element: HTMLElement,
  width: number,
  height: number,
  x: number,
  y: number
) {
  element.style.left = toPx(x - width / 2);
  element.style.top = toPx(y - height / 2);
}

export const createPlaceholder = (width: number, height: number) => {
  const placeholder = createDivToSize(width, height);
  placeholder.style.border = '2px solid red';
  return placeholder;
};

export const moveElementToDraggableContainer = (
  element: HTMLElement,
  width: number,
  height: number
) => {
  const draggableContainer = createDivToSize(width, height);
  draggableContainer.style.position = 'absolute';

  draggableContainer.appendChild(element);
  document.body.appendChild(draggableContainer);

  return draggableContainer;
};

export const resetElement = (element: HTMLElement) => {
  element.style.position = '';
  element.style.left = '';
  element.style.top = '';
};

export const moveDraggableToDroppable = (draggable: HTMLElement, droppable: HTMLElement) => {
  if (draggable.firstChild) {
    const element = draggable.firstChild as HTMLElement;
    resetElement(element);
    droppable.appendChild(element);
    // console.dir(droppable);
    document.body.removeChild(draggable);
  }
};
