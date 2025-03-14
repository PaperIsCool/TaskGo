<template>
  <div>
    <ToDoItems :tasks="tasks" @toggleTaskStatus="toggleTaskStatus" @removeTask="removeTask" @updateTaskName="updateTaskName" />
    <input v-model="task" type="text" placeholder="Add a task (Enter)" class="text-input" @keyup.enter="addTask(task)" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from 'vue';
import ToDoItems from './ToDoItems.vue';

export default {
  name: 'ToDoList',
  components: {
    ToDoItems
  },
  setup() {
    const tasks = reactive({});
    const task = ref('');

    const addTask = (taskVal) => {
      if (taskVal.trim() !== '') {
        tasks[taskVal] = "incomplete";
        task.value = '';
        reorderTasks();
        saveLocalStorage();
      }
    };

    const saveLocalStorage = () => {
      window.localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const removeTask = (taskName) => {
      delete tasks[taskName];
      reorderTasks();
      saveLocalStorage();
    };

    const completeTask = (taskName) => {
      tasks[taskName] = "complete";
      reorderTasks();
      saveLocalStorage();
    };

    const incompleteTask = (taskName) => {
      tasks[taskName] = "incomplete";
      reorderTasks();
      saveLocalStorage();
    };

    const toggleTaskStatus = (taskName, isChecked) => {
      if (isChecked) {
        completeTask(taskName);
      } else {
        incompleteTask(taskName);
      }
      reorderTasks();
    };

    const updateTaskName = (oldName, newName) => {
      if (newName.trim() !== '' && oldName !== newName) {
        const keys = Object.keys(tasks);
        const values = keys.map(key => tasks[key]);
        const index = keys.indexOf(oldName);
        let before_taskNames = [];
        let before_status = [];
        let after_taskNames = [];
        let after_status = [];

        for (let i = 0; i < index; i++) {
          before_taskNames.push(keys[i]);
          before_status.push(values[i]);
        }

        for (let i = index + 1; i < keys.length; i++) {
          after_taskNames.push(keys[i]);
          after_status.push(values[i]);
        }

        clearTasks();

        for (let i = 0; i < before_taskNames.length; i++) {
          tasks[before_taskNames[i]] = before_status[i];
        }

        tasks[newName] = values[index];

        for (let i = 0; i < after_taskNames.length; i++) {
          tasks[after_taskNames[i]] = after_status[i];
        }
        reorderTasks();
        saveLocalStorage();
      }
    };

    const clearCompletedTasks = () => {
      for (const task in tasks) {
        if (tasks[task] === "complete") {
          delete tasks[task];
        }
      }
      reorderTasks();
      saveLocalStorage();
    };

    const addPlaceholders = () => {
      addTask("Buy groceries");
      addTask("Clean the garage");
      addTask("Finish reading the report");
      addTask("Schedule doctor's appointment");
      addTask("Call the insurance company");
      addTask("Send meeting notes to team");
      addTask("Organize the bookshelf");
      completeTask("Send meeting notes to team");
      completeTask("Schedule doctor's appointment");
      completeTask("Clean the garage");
    };

    const reorderTasks = () => {
      const completedTasks = {};
      const incompleteTasks = {};

      for (const task in tasks) {
        if (tasks[task] === "complete") {
          completedTasks[task] = "complete";
        } else {
          incompleteTasks[task] = "incomplete";
        }
      }

      Object.keys(tasks).forEach(task => delete tasks[task]);
      Object.assign(tasks, incompleteTasks, completedTasks);
      saveLocalStorage();
    };

    const clearTasks = () => {
      Object.keys(tasks).forEach(task => delete tasks[task]);
      saveLocalStorage();
    };

    onMounted(() => {
      loadLocalStorage();
      window.addPlaceholders = addPlaceholders;
      window.clearTasks = clearTasks;
      window.clearCompletedTasks = clearCompletedTasks;
    });

    const loadLocalStorage = () => {
      const savedTasks = window.localStorage.getItem('tasks');
      if (savedTasks) {
        Object.assign(tasks, JSON.parse(savedTasks));
      }
    };

    watch(tasks, (val) => {
      window.localStorage.setItem('tasks', JSON.stringify(val));
    });

    return { task, tasks, addTask, removeTask, completeTask, incompleteTask, toggleTaskStatus, clearTasks, clearCompletedTasks, addPlaceholders, updateTaskName };
  }
};
</script>

<style scoped>
.text-input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: none;
  background-color: #222222;
  color: #F5F5F5;
  width: 40vw;
  font-size: 100%;
  margin-bottom: 5%;
  text-align: left;
}
.text-input::placeholder {
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: #222222;
  color: #B0B0B0;
}
.text-input:focus {
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
}
</style>