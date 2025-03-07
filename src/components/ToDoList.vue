<template>
  <div>
    <ToDoItems 
      :tasks="tasks" 
      @toggleTaskStatus="toggleTaskStatus" 
      @removeTask="removeTask"
    />
    <input v-model="task" type="text" placeholder="Add a task (Enter)" class="text-input" @keyup.enter="addTask(task)"/>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import ToDoItems from './ToDoItems.vue';
import { watch } from 'vue';

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
      }
      reorderTasks();
    };

    const removeTask = (taskName) => {
      delete tasks[taskName];
    };

    const completeTask = (taskName) => {
      delete tasks[taskName];
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
    };


    onMounted(() => {
      window.addPlaceholders = addPlaceholders;
      window.clearTasks = clearTasks;
      window.clearCompletedTasks = clearCompletedTasks;
    });

    const savedTasks = window.localStorage.getItem('tasks');
    if (savedTasks) {
      Object.assign(tasks, JSON.parse(savedTasks));
    }

    watch(tasks, (val) => {
      window.localStorage.setItem('tasks', JSON.stringify(val));
    })

    return { task, tasks, addTask, removeTask, completeTask, incompleteTask, toggleTaskStatus, clearTasks, clearCompletedTasks, addPlaceholders };
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