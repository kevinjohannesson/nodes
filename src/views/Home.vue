<template>
  <div class="home">
    <Droppable class="container">
      Droppable #1
      <Draggable id="drag1">
        Draggable #1
      </Draggable>
      <Draggable id="drag2">
        Draggable #2
      </Draggable>
    </Droppable>
    <Droppable class="container">
      Droppable #2
      <Draggable id="drag3">
        Draggable #3
      </Draggable>
    </Droppable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Droppable from '@/components/Droppable.vue';
import Draggable from '@/components/Draggable.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Droppable,
    Draggable,
  },
});
</script>

<style scoped lang="sass">
.home
  border: 1px solid green
  display: flex
  flex: 1
  flex-direction: row
  justify-content: space-around

.container
  border: 3px solid green

#id
  background-color: white
</style>
