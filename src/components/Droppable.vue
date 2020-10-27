<template>
  <div :id="id" class="droppable" @dragover.prevent @drop.prevent="drop" data-droppable>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Droppable',
  props: { id: String },
  methods: {
    drop: (e: DragEvent) => {
      console.log('drop.prevent');
      if (e.dataTransfer) {
        const id = e.dataTransfer.getData('draggable_id');
        if (!id) throw new Error('No draggable ID found!');

        const element = document.getElementById(id);
        if (!element) throw new Error('No draggable element found with ID: ' + id);

        (e.target as HTMLDivElement).appendChild(element);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.droppable
  border: 2px solid red
</style>
