<template>
  <div :id="id" class="draggable" @mousedown="mousedown" data-draggable @mouseover="mouseover">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toPx } from './convert';
import { Draggable } from '../models/DragDrop';

export default defineComponent({
  name: 'Draggable',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    mousedown(e: DragEvent) {
      const { target, x, y } = e;
      if (!target) throw new Error();

      const draggable = this.createDraggable(target as HTMLElement);
      this.updateState(draggable);

      this.extractElement();
      this.positionDraggableUnderCursor(x, y);

      this.dragStart();
    },
    mouseover(e: MouseEvent) {
      const { draggable } = this.$store.state;
      if (draggable && e.target) {
        this.$store.commit(
          'setIndex',
          this.findDraggableIndex(e.target as HTMLElement, draggable.origin as HTMLDivElement)
        );
      }
    },
    findDraggableIndex(element: HTMLElement, parent: HTMLDivElement) {
      const siblings = Array.from(parent.querySelectorAll('[data-draggable]'));
      // console.log(siblings);
      const index = siblings.indexOf(element);
      console.log(index);
      return index;
    },
    createDraggable(element: HTMLElement) {
      const origin = element.closest('[data-droppable]') as HTMLDivElement;
      if (!origin) throw new Error('No droppable origin!');
      const style = window.getComputedStyle(element);
      const { width, height, margin, borderRadius } = style;
      const { id } = this;
      const index = this.findDraggableIndex(element, origin);
      // const position = origin.querySelectorAll
      console.log(origin);
      const nodes = origin.querySelectorAll('[data-draggable]');

      function isBefore(el1: HTMLElement, el2: HTMLElement) {
        console.log(el1);
        console.log(el2);
        let cur;
        if (el2.parentNode === el1.parentNode) {
          for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === el2) return true;
          }
        }
        return false;
      }
      console.log(isBefore(nodes[1] as HTMLElement, nodes[0] as HTMLElement));
      console.log(nodes);

      return {
        element,
        index,
        id,
        width,
        height,
        margin,
        borderRadius,
        origin,
      };
    },
    updateState(draggable: Draggable) {
      this.$store.commit('setDraggable', draggable);
      this.$store.commit(
        'setIndex',
        this.findDraggableIndex(draggable.element, draggable.origin as HTMLDivElement)
      );
    },
    extractElement() {
      const { element, width, height } = this.$store.state.draggable;
      element.style.position = 'absolute';
      element.style.width = width;
      element.style.height = height;
      element.style.pointerEvents = 'none';
      document.body.appendChild(element);
    },
    positionDraggableUnderCursor(x: number, y: number) {
      const { element, width, height } = this.$store.state.draggable;
      element.style.left = toPx(x - parseInt(width) / 2);
      element.style.top = toPx(y - parseInt(height) / 2);
    },
    dragStart() {
      document.body.style.cursor = 'grabbing';
      document.addEventListener('mousemove', this.mousemove);
      document.addEventListener('mouseup', this.mouseup, { once: true });
    },
    mousemove(e: MouseEvent) {
      const { x, y } = e;
      this.positionDraggableUnderCursor(x, y);
    },
    mouseup() {
      this.dragEnd();
      this.moveToDroppable();
      this.resetElement();
      this.resetState();
    },
    dragEnd() {
      document.removeEventListener('mousemove', this.mousemove);
      document.body.style.cursor = '';
    },
    moveToDroppable() {
      const { droppable, draggable } = this.$store.state;
      if (droppable) droppable.appendChild(draggable.element);
      else draggable.origin.appendChild(draggable.element);
    },
    resetElement() {
      const { element } = this.$store.state.draggable;
      element.style.position = '';
      element.style.left = '';
      element.style.top = '';
      element.style.pointerEvents = '';
    },
    resetState() {
      this.$store.commit('resetState');
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.draggable
  background-color: white
  border-radius: 5px
  padding: 0.5em
  margin: 0.25em
  user-select: none
  cursor: grab
</style>
