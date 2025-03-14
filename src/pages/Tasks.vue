<template>
  <div id="app" class="container-fluid main-content-area">
    <div class="row vh-100">
      <div class="col-auto p-0">
        <Sidebar :user="user" />
      </div>
      <div class="col d-flex justify-content-center">
        <div class="main-content-box">
          <div class="progress-container"><progress :value="completedTasks" :max="totalTasks" class="progress">{{ completedTasks }}/{{ totalTasks }}</progress></div>
          <h1 class="mt-4 mb-2 off-white text-center">Your Tasks</h1>
          <h5 v-if="!user" class="text-center mb-4">Not Logged In - Using Local Storage</h5>
          <h5 v-else class="text-center mb-4">Welcome back {{ firstName }}!</h5>
          <ToDoList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Register from '@/components/Register.vue';
  import SignIn from '@/components/SignIn.vue';
  import Navbar from '@/components/Navbar.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import ToDoList from '@/components/ToDoList.vue';
  import { auth } from '../firebase'; // Import auth
  import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
  import { doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc
  import { db } from '../firebase'; // Import db
  import { tasks } from '@/components/ToDoList.vue';
  import { computed } from 'vue';

  export default {
      components:{
        Register, SignIn, Navbar, Sidebar, ToDoList
      },
      setup() {
        const showSignUp = ref(false);
        const showSignIn = ref(false);
        const router = useRouter();
        const user = ref(null); 
        const firstName = ref(null);
        const userEmail = ref(null);

        const totalTasks = computed(() => Object.keys(tasks).length);
        const completedTasks = computed(() => Object.values(tasks).filter(status => status === "complete").length);

        
        const getUserFirstName = async (email) => {
          try {
            // Get a reference to the document
            const docRef = doc(db, 'users', email);
            
            // Fetch the document snapshot
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              // Document found, access the firstName field
              const userData = docSnap.data();
              firstName.value = userData.firstName;
              
              console.log("First Name:", firstName.value);
              return firstName;
            } else {
              console.log("No first name!");
            }
          } catch (error) {
            console.error("Error getting first name:", error);
          }
        };

        const goToHome = () => {
          router.push('/');
        };
        
        onMounted(() => {
          // Listen to authentication state changes
          onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;  // Set the current user
            if (currentUser) {
              userEmail.value = currentUser.email;  // Extract the email if user is signed in
              getUserFirstName(userEmail.value);  // Get the user's first name
            } else {
              userEmail.value = null;  // Clear email if user is not signed in
            }
          });
        });

        console.log("Total Tasks:", totalTasks.value);
        console.log("Completed Tasks:", completedTasks.value);

        return { showSignUp, showSignIn, goToHome, user, firstName, totalTasks, completedTasks };        
      },
  }
</script>

<style scoped>
.progress {
  width: 100%;
  height: 1%;
  background-color: #e0e0e0;
  border-radius: 0px;
  overflow: hidden;
  border: none;
  transition: all 0.3s ease; 
}

.progress[value]::-webkit-progress-bar {
  background-color: #6200EE;
  border-radius: 0px;
  border: none;
}

.progress[value]::-webkit-progress-value {
  background-color: #6200EE;
  border-radius: 0px 0 0 0px;
  border: none;
}

.progress[value]::-moz-progress-bar {
  background-color: #6200EE;
  border-radius: 0px 0 0 0px;
  border: none;
}


.progress-container {
  position: absolute;
  top: 0;
  left: 10vw;
  width: 90vw;
  z-index: 1;
}

</style>