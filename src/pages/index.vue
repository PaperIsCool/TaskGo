<template>
  <div class="navbar-area text-center">
    <Navbar :user="user" @openRegister="openRegister" @openSignIn="openSignIn">
      <a class="nav-link active">Home</a>
      <a class="nav-link hover-pointer" @click="goToTasks">Tasks</a>
    </Navbar>
    <Register :show="showSignUp" @close="showSignUp = false" />
    <SignIn :show="showSignIn" @close="showSignIn = false" />
  </div>
  <div id="app" class="container-fluid main-content-area">
      <div class="row justify content-center align-items-center vh-95">
        <div class="col-sm-6 text-center">
          <img src="../assets/logo.png" class="logo" />
        </div>
        <div class="col-sm-6">
          <h1 class="off-white title-size pb-4" v-if="!user">Stay Organized. Stay Productive. </h1>
          <h1 class="off-white title-size pb-4" v-if="user">Welcome back, {{ firstName }}!</h1>
          <p class="pb-4" v-if="!user">Effortlessly manage your tasks with TaskGo - Anywhere, Anytime. </p>
          <p class="pb-4" v-if="user">Stay Organized. Stay Productive. Effortlessly manage your tasks with TaskGo - Anywhere, Anytime. </p>
          <button class="btn btn-dark cta-btn-primary" @click="goToTasks" v-if="!user">Get Started</button>
          <button class="btn btn-dark cta-btn-primary" @click="goToTasks" v-if="user">Go to Tasks</button>  
          <button class="btn btn-dark cta-btn-secondary" @click="openSignIn" v-if="!user">Log In</button>  
        </div>
      </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import Register from '@/components/Register.vue';
  import SignIn from '@/components/SignIn.vue';
  import Navbar from '@/components/Navbar.vue';
  import { useRouter } from 'vue-router';
  import { auth } from '../firebase';
  import { onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from '../firebase';

  export default {
      components:{
        Register, SignIn, Navbar
      },
      setup() {
        const showSignUp = ref(false);
        const showSignIn = ref(false);
        const router = useRouter();
        const user = ref(null)
        const firstName = ref(null);
        const userEmail = ref(null);


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

        const goToTasks = () => {
          router.push('/app');
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

        const openRegister = () => {
          showSignUp.value = true;
        }

        const openSignIn = () => {
          showSignIn.value = true;
        }

        return { showSignUp, showSignIn, goToTasks, user, openRegister, openSignIn, firstName }
      },
  }
</script>