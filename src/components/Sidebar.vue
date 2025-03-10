<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <img class="navbar-brand" src="../assets/logo.png" alt="Logo" />
    </div>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link hover-pointer" @click="goToHome">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link">Tasks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link hover-pointer" @click="showSignUp = true">Register</a>
      </li>
      <li class="nav-item">
        <a class="nav-link hover-pointer" @click="showSignIn = true">Log In</a>
      </li>
    </ul>
    <Register :show="showSignUp" @close="showSignUp = false" style="z-index: 10;" />
    <SignIn :show="showSignIn" @close="showSignIn = false" style="z-index: 10;" />
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Register from '@/components/Register.vue';
import SignIn from '@/components/SignIn.vue';

export default {
  components: {
    Register,
    SignIn
  },
  setup() {
    const showSignUp = ref(false);
    const showSignIn = ref(false);
    const router = useRouter();

    const goToHome = () => {
      router.push('/');
    };

    const goToTasks = () => {
      router.push('/app');
    };

    return { showSignUp, showSignIn, goToHome, goToTasks };
  }
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 10vw;
  background-color: #333333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.sidebar-header {
  margin-bottom: 20px;
}

.navbar-brand {
  width: 7vw;
}

.nav {
  width: 100%;
}

.nav-item {
  width: 100%;
}

.nav-link {
  color: white;
  padding: 10px 20px;
  text-align: center;
  display: block;
  width: 100%;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #444444;
}

.main-content-tasks {
  display: flex;
  justify-content: center;
}
</style>