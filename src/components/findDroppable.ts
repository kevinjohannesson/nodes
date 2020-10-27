function findDroppable(x: number, y: number) {
  console.log(x, y);
  const droppables = Array.from(document.querySelectorAll('[data-droppable]'));
  console.log(droppables);
  const droppable = droppables.filter((droppable) => {
    console.log(droppable);
    const DOMRect = droppable.getBoundingClientRect();
    console.log(DOMRect);
    if (x > DOMRect.left && x < DOMRect.right && y > DOMRect.top && y < DOMRect.bottom) {
      return droppable;
    }
  });
  if (droppable.length) {
    console.log(droppable);
    console.log(droppable[droppable.length - 1]);
    return droppable[droppable.length - 1] as HTMLElement;
  }
}

export default findDroppable;
