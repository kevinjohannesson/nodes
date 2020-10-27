<template>
  <div :id="id" class="draggable" draggable="true" @dragstart.prevent="dragstart" @dragover.stop>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import findDroppable from './findDroppable';
import {
  getDraggableData,
  createPlaceholder,
  moveElementToDraggableContainer,
  positionElementUnderCursor,
  resetElement,
  moveDraggableToDroppable,
} from './translateElement';

interface DraggableData {
  element: HTMLElement;
  origin: HTMLElement;
  width: number;
  height: number;
}

export default defineComponent({
  name: 'Draggable',
  props: { id: String },
  data() {
    return {
      draggableElement: null as HTMLDivElement | null,
      draggableData: null as DraggableData | null,
      placeholder: null as HTMLDivElement | null,
    };
  },
  methods: {
    dragstart(e: DragEvent) {
      const { target, x, y } = e;
      if (target) {
        this.draggableData = getDraggableData(target as HTMLDivElement);
        const { element, origin, width, height } = this.draggableData;

        this.draggableElement = moveElementToDraggableContainer(element, width, height);
        positionElementUnderCursor(this.draggableElement, width, height, x, y);

        this.placeholder = createPlaceholder(width, height);
        if (!this.placeholder) throw new Error('Placeholder not created!');
        origin.appendChild(this.placeholder);
      }

      document.body.style.cursor = 'grabbing';
      document.addEventListener('mousemove', this.mousemove);

      document.addEventListener(
        'mouseup',
        (e: MouseEvent) => {
          document.body.style.cursor = '';
          document.removeEventListener('mousemove', this.mousemove);
          const droppable = findDroppable(e.x, e.y);
          console.log(droppable);
          if (!this.draggableData) throw new Error();
          if (!this.draggableElement) throw new Error();
          if (!this.placeholder) throw new Error();

          const target = droppable ? droppable : this.draggableData.origin;
          moveDraggableToDroppable(this.draggableElement, target);

          this.draggableData.origin.removeChild(this.placeholder);
        },
        { once: true }
      );
    },
    mousemove(e: MouseEvent) {
      if (this.draggableElement && this.draggableData) {
        const { x, y } = e;
        const { width, height } = this.draggableData;
        positionElementUnderCursor(this.draggableElement, width, height, x, y);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.draggable
  border: 2px solid lightblue
  user-select: none
  cursor: grab
</style>
