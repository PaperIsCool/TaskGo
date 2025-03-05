<template>
  <div class="navbar-area text-center">
    <Navbar>
      <a class="nav-link hover-pointer" @click="goToHome">Home</a>
      <a @click="showSignUp = true" class="nav-link hover-pointer">Register</a>
      <Register :show="showSignUp" @close="showSignUp = false" />
      <a @click="showSignIn = true" class="nav-link hover-pointer">Log In</a>
      <SignIn :show="showSignIn" @close="showSignIn = false" />
    </Navbar>
  </div>
  <div id="app" class="container-fluid main-content-area">
      <div class="row justify content-center align-items-center vh-95">
        <div class="col-sm-6 text-center">
          <img src="../assets/logo.png" class="logo" />
        </div>
        <div class="col-sm-6">
          <h1 class="off-white title-size pb-4">WIP</h1>
          <p class="pb-4">Please come back later.</p>       
        </div>
      </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Register from '@/components/Register.vue';
  import SignIn from '@/components/SignIn.vue';
  import Navbar from '@/components/Navbar.vue';

  export default {
      components:{
        Register, SignIn, Navbar
      },
      setup() {
        const showSignUp = ref(false);
        const showSignIn = ref(false);
        const router = useRouter();

        const goToHome = () => {
          router.push('/');
        };

        return { showSignUp, showSignIn, goToHome }
      },
  }
</script>