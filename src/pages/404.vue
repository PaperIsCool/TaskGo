<template>
  <div class="navbar-area text-center">
    <Navbar :user="user" @openRegister="openRegister" @openSignIn="openSignIn">
      <a class="nav-link hover-pointer" @click="goToHome">Home</a>
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
        <h1 class="off-white title-size pb-4">404 error</h1>
        <p class="pb-4">The page you are looking for does not exist.</p>
        <button class="btn btn-dark cta-btn-primary" @click="goToHome">Go to Home</button>
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
  components: {
    Register,
    SignIn,
    Navbar,
  },
  setup() {
    const showSignUp = ref(false);
    const showSignIn = ref(false);
    const router = useRouter();
    const user = ref(null);

    const goToHome = () => {
      router.push('/');
    };

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
    };

    const openSignIn = () => {
      showSignIn.value = true;
    };

    return {
      showSignUp,
      showSignIn,
      goToHome,
      goToTasks,
      user,
      openRegister,
      openSignIn,
    };
  },
};
</script>