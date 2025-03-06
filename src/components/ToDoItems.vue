<template>
  <div v-for="(status, taskName) in tasks" :key="taskName">
    <CustomCheckbox :checked="status === 'complete'" @change="toggleTaskStatus(taskName, $event)"/>
    <span :class="{ 'completed': status === 'complete', 'incomplete': status === 'incomplete' }">{{ taskName }}</span>
    <button @click="removeTask(taskName)" class="btn btn-link text-right close-btn">✖</button>
    <hr />
  </div>
</template>

<script>
import CustomCheckbox from './checkbox.vue';

export default {
  name: 'ToDoItems',
  components: {
    CustomCheckbox
  },
  props: {
    tasks: Object
  },
  emits: ['toggleTaskStatus', 'removeTask'],
  methods: {
    toggleTaskStatus(taskName, isChecked) {
      this.$emit('toggleTaskStatus', taskName, isChecked);
    },
    removeTask(taskName) {
      this.$emit('removeTask', taskName);
    }
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #B0B0B0;
}

.incomplete {
  color: #F5F5F5;
}

body {
    color: #F5F5F5;
}

.text-right {
    float: right;
}

.close-btn {
    text-decoration: none;
    color: #B0B0B0;
}

.close-btn:active {
    text-decoration: none;
    color: #F5F5F5;
}
</style>
