<template>
  <div class="home">
    <Droppable class="container" id="droppable_1">
      Droppable #1
      <Draggable id="draggable_1">
        Draggable #1
      </Draggable>
      <Draggable id="draggable_2">
        Draggable #2
      </Draggable>
      <Draggable id="draggable_3">
        Draggable #3
      </Draggable>
      <Draggable id="draggable_4">
        Draggable #4
      </Draggable>
      <Draggable id="draggable_5">
        Draggable #5
      </Draggable>
    </Droppable>
    <Droppable class="container" id="droppable_2">
      Droppable #2
      <Draggable id="draggable_6">
        Draggable #6
      </Draggable>
      <Draggable id="draggable_7">
        Draggable #7
      </Draggable>
      <Draggable id="draggable_8">
        Draggable #8
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
  // border: 3px solid green

#id
  background-color: white
</style>
