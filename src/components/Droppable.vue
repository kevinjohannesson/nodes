<template>
  <div
    :id="id"
    class="droppable"
    data-droppable
    v-bind:class="{ active: dragInProgress, hover: isHovered && dragInProgress }"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    ref="droppable"
  >
    <slot />
    <div
      v-bind:class="{ placeholder: isHovered }"
      ref="placeholder"
      data-placeholder
      data-draggable
      v-bind:style="placeholderStyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { toPx } from './convert';

export default defineComponent({
  name: 'Droppable',
  props: { id: String },
  data: () => {
    return {};
  },
  computed: {
    dragInProgress(): boolean {
      return this.$store.state.draggable !== null;
    },
    isHovered(): boolean {
      const { droppable } = this.$store.state;
      return droppable !== null && droppable.id === this.id;
    },
    placeholderStyle(): Partial<CSSStyleDeclaration> {
      const { index, draggable } = this.$store.state;
      const placeholder = this.$refs.placeholder as HTMLDivElement;
      if (this.dragInProgress && this.isHovered) {
        const { width, height, margin, borderRadius } = draggable;
        placeholder.style.width = width;
        placeholder.style.height = height;
        placeholder.style.margin = margin;
        placeholder.style.borderRadius = borderRadius;

        //   if (!target) throw new Error();
        console.log('placing....');
        console.log(this.$store.state.index);

        const siblings = Array.from(
          (placeholder.parentNode as HTMLDivElement).querySelectorAll('[data-draggable]')
        );
        const placeholderIndex = siblings.indexOf(placeholder);
        const index = this.$store.state.index;
        if (placeholderIndex > index) {
          (placeholder.parentNode as HTMLDivElement).insertBefore(
            placeholder,
            (placeholder.parentNode as HTMLDivElement).children[this.$store.state.index]
          );
        } else {
          (placeholder.parentNode as HTMLDivElement).insertBefore(
            placeholder,
            (placeholder.parentNode as HTMLDivElement).children[this.$store.state.index].nextSibling
          );
        }

        return {
          width,
          height,
          margin,
          borderRadius,
        };
      } else {
        return {};
      }
    },
  },
  methods: {
    orderPlaceholder() {
      console.log('orderPlaceholder');
    },
    mouseenter(e: MouseEvent) {
      console.log('mouseenter');

      if (this.dragInProgress) {
        console.log('drag is active');
        this.$store.commit('setDroppable', e.target);
      }
    },
    mouseleave(e: MouseEvent) {
      console.log('mouseleave');
      this.$store.commit('setDroppable', null);
    },
  },
});
</script>

<style lang="sass">
.droppable
  text-align: center

.active
  border: 3px dashed white

.hover
  border: 5px dashed green

.placeholder
  border: 3px solid red
</style>
