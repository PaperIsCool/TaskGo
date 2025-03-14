<template>
  <div>
    <ToDoItems :tasks="tasks" @toggleTaskStatus="completeTask" @removeTask="removeTask" @updateTaskName="updateTaskName" />
    <input v-model="task" type="text" placeholder="Add a task (Enter)" class="text-input" @keyup.enter="addTask(task)" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue';
import ToDoItems from './ToDoItems.vue';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  name: 'ToDoList',
  components: {
    ToDoItems
  },
  setup() {
    const tasks = reactive({});
    const task = ref('');
    const user = ref(null);
    const userEmail = ref(null);
    
    // --------------------- GET USER STATUS ---------------------
    
    const getUserStatus = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          userEmail.value = currentUser.email;
          await loadStorage(); // ensure we load tasks after setting user
        } else {
          user.value = false;
          userEmail.value = null;
          Object.keys(tasks).forEach(task => delete tasks[task]); // clear tasks on sign out
        }
      });
    };

    // --------------------- LOAD STORAGE ---------------------
    
    const loadStorage = async () => {
    if (user.value) {
        try {
          const docRef = doc(db, 'users', userEmail.value);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            Object.keys(tasks).forEach(task => delete tasks[task]); // clear tasks before reloading
            Object.assign(tasks, userData.tasks || {});
          } else {
            console.log("No tasks found!");
          }
        } catch (error) {
          console.error("Error loading tasks:", error);
        }
      } else {
        const savedTasks = window.localStorage.getItem('tasks');
        Object.keys(tasks).forEach(task => delete tasks[task]); // clear tasks before reloading
        if (savedTasks) Object.assign(tasks, JSON.parse(savedTasks));
      }
      reorderTasks();
    };
    
    // --------------------- SAVE STORAGE ---------------------

    const saveStorage = async () => {
      if (user.value) {
        try {
          const docRef = doc(db, 'users', userEmail.value);
          await updateDoc(docRef, {
            tasks: JSON.parse(JSON.stringify(tasks))
          });
        } catch (error) {
          console.error("Error saving tasks:", error);
        }
      } else {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    };
    
    // --------------------- ADD A TASK ---------------------

    const addTask = (taskVal) => {
      if (taskVal.trim() !== '') {
        tasks[taskVal] = "incomplete";
        task.value = '';
        reorderTasks();
        saveStorage();
      }
    };

    // --------------------- REMOVE A TASK ---------------------

    const removeTask = (taskName) => {
      delete tasks[taskName];
      reorderTasks();
      saveStorage();
    };

    // --------------------- COMPLETE A TASK ---------------------

    const completeTask = (taskName) => {
      tasks[taskName] = "complete";
      reorderTasks();
      saveStorage();
    };

    // --------------------- UPDATE TASK NAME ---------------------

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

        Object.keys(tasks).forEach(task => delete tasks[task]);

        for (let i = 0; i < before_taskNames.length; i++) {
          tasks[before_taskNames[i]] = before_status[i];
        }

        tasks[newName] = values[index];

        for (let i = 0; i < after_taskNames.length; i++) {
          tasks[after_taskNames[i]] = after_status[i];
        }
        
        reorderTasks();
        saveStorage();
      }
    };

    // --------------------- REORDER TASKS ---------------------

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
      saveStorage();
    };

    // --------------------- ON LOADING ---------------------

    onMounted(() => {
      getUserStatus();
    });

    // --------------------- ON CLOSING  ---------------------

    onUnmounted(() => {
      saveStorage();
    });

    // --------------------- WATCHERS ---------------------

    watch(user, (newUser) => {
      loadStorage();
    })


    return { task, tasks, addTask, removeTask, completeTask, updateTaskName };
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