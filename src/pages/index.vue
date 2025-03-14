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
          <h1 class="off-white title-size pb-4" v-if="user">Welcome back!</h1>
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

  export default {
      components:{
        Register, SignIn, Navbar
      },
      setup() {
        const showSignUp = ref(false);
        const showSignIn = ref(false);
        const router = useRouter();
        const user = ref(null)

        const goToTasks = () => {
          router.push('/app');
        };

        onMounted(() => {
          onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;
          });
        });

        const openRegister = () => {
          showSignUp.value = true;
        }

        const openSignIn = () => {
          showSignIn.value = true;
        }

        return { showSignUp, showSignIn, goToTasks, user, openRegister, openSignIn }
      },
  }
</script>