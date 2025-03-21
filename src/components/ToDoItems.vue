<template>
  <div v-for="(status, taskName) in incompleteTasksObj" :key="taskName">
    <CustomCheckbox :checked="status === 'complete'" @change="toggleTaskStatus(taskName, $event)" :disabled="status === 'complete'"/>
    <span v-if="!isEditing[taskName]" :class="{ 'completed': status === 'complete', 'incomplete': status === 'incomplete' }">{{ taskName }}</span>
    <input v-else v-model="editedTask" @keyup.enter="updateTask(taskName)" @keyup.esc="cancelEdit(taskName)" type="text" class="text-input" @blur="cancelEdit(taskName)" />
    <button @click="removeTask(taskName)" class="btn btn-link text-right close-btn">✖</button>
    <button @click="editTask(taskName)" class="btn btn-link text-right close-btn">✎</button>
    <hr />
  </div>
</template>

<script>
import CustomCheckbox from './Checkbox.vue';
import { ref, reactive, nextTick, computed } from 'vue';
import { tasks } from '@/components/ToDoList.vue';

export default {
  name: 'ToDoItems',
  components: {
    CustomCheckbox
  },
  props: {
    tasks: Object
  },
  emits: ['toggleTaskStatus', 'removeTask', 'updateTaskName'],
  setup(props, { emit }) {
    const isEditing = reactive({});
    const editedTask = ref('');

    const editTask = (task) => {
      if (isEditing[task]) {
        isEditing[task] = false;
        editedTask.value = task;
      } else {
        isEditing[task] = true;
        editedTask.value = task;
      }
      nextTick(() => {
        const input = document.querySelector('.text-input');
        input.focus();
      });
    };

    const updateTask = (task) => {
      emit('updateTaskName', task, editedTask.value);
      isEditing[task] = false;
    };

    const cancelEdit = (task) => {
      isEditing[task] = false;
    };

    const toggleTaskStatus = (task, isChecked) => {
      if (props.tasks[task] === 'complete') return;
      emit('toggleTaskStatus', task, isChecked);
    };

    const removeTask = (task) => {
      emit('removeTask', task);
    };

    const completedTasksObj = computed(() => {
      const completed = {};
      for (const [taskName, status] of Object.entries(tasks)) {
      if (status === 'complete') {
        completed[taskName] = status;
      }
      }
      return completed;
    });

    const incompleteTasksObj = computed(() => {
      const incomplete = {};
      for (const [taskName, status] of Object.entries(tasks)) {
      if (status === 'incomplete') {
        incomplete[taskName] = status;
      }
      }
      return incomplete;
    });

    return { isEditing, editedTask, editTask, updateTask, cancelEdit, toggleTaskStatus, removeTask, completedTasksObj, incompleteTasksObj };
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
.text-input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: none;
  background-color: #222222;
  color: #F5F5F5;
  width: 30vw;
  font-size: 100%;
  text-align: left;
}
</style>
