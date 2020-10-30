import { createStore } from 'vuex';
import { Draggable } from '../models/DragDrop';
export default createStore({
  state: {
    originElement: null as null | HTMLDivElement,
    hoveredElement: null as null | HTMLDivElement,
    droppable: null as null | HTMLElement,
    draggable: null as null | Draggable,
    index: null as null | number,
  },
  mutations: {
    setOrigin(state, div: HTMLDivElement) {
      state.originElement = div;
    },
    setHoveredElement(state, div: HTMLDivElement) {
      state.hoveredElement = div;
    },
    setDraggable(state, draggable: Draggable) {
      state.draggable = draggable;
    },
    setDroppable(state, droppable) {
      state.droppable = droppable;
    },
    setIndex(state, index: number) {
      state.index = index;
    },
    resetState(state) {
      state.draggable = null;
      state.droppable = null;
    },
  },
  actions: {},
  modules: {},
});
