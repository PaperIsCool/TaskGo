<template>
    <div>
      <button @click="replaceWithPlaceholder" class="btn btn-danger">[DEV] Replace tasks with placeholders</button>
      <ul>
        <li v-for="(status, taskName) in tasks" :key="taskName">
            <input type="checkbox" @change="toggleTaskStatus(taskName, $event.target.checked)" :checked="status === 'complete'" />
            <button @click="removeTask(taskName)" class="btn btn-danger">-</button>
            <span :class="{ 'completed': status === 'complete' }">{{ taskName }}</span>
        </li>
      </ul>
  
      <input v-model="task" type="text" placeholder="Add a task" />
      <button class="btn btn-success" @click="addTask(task)">+</button>
  
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  
  export default {
    name: 'ToDoList',
    setup() {
      const tasks = reactive({});
      const task = ref('');
  
      const addTask = (taskVal) => {
        if (taskVal.trim() !== '') {
          tasks[taskVal] = "incomplete";
          task.value = '';
        }
      };

      const removeTask = (taskName) => {
        delete tasks[taskName];
      };
  
      const completeTask = (taskName) => {
        tasks[taskName] = "complete"; 
      };
  
      const incompleteTask = (taskName) => {
        tasks[taskName] = "incomplete";
      };

      const toggleTaskStatus = (taskName, isChecked) => {
        if (isChecked) {
          completeTask(taskName);
        } else {
          incompleteTask(taskName);
        }
      };
  
      const clearTasks = () => {
        Object.keys(tasks).forEach((task) => {
            delete tasks[task];
        });
      };
  
      const clearCompletedTasks = () => {
        for (const task in tasks) {
          if (tasks[task] === "complete") {
            delete tasks[task];
          }
        }
      };

      const replaceWithPlaceholder = () => {
        clearTasks();
        addTask("Buy groceries");
        addTask("Clean the garage");
        completeTask("Clean the garage");
        addTask("Finish reading the report");
        addTask("Schedule doctor's appointment");
        completeTask("Schedule doctor's appointment");
        addTask("Call the insurance company");
        addTask("Send meeting notes to team");
        completeTask("Send meeting notes to team");
        addTask("Organize the bookshelf");
      };
  
      return { task, tasks, addTask, removeTask, completeTask, incompleteTask, toggleTaskStatus, clearTasks, clearCompletedTasks, replaceWithPlaceholder };
    }
  };

  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
