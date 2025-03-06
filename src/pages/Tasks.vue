<template>
  <div id="app" class="container-fluid main-content-area">
    <div class="row vh-100">
      <div class="col-auto p-0">
      <Sidebar />
      </div>
      <div class="col d-flex justify-content-center">
        <div class="main-content-box">
          <h1 class="mt-3 off-white text-center">Tasks</h1>
          <ToDoList />
        </div>
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
  import Sidebar from '@/components/Sidebar.vue';
  import ToDoList from '@/components/ToDoList.vue';

  export default {
      components:{
        Register, SignIn, Navbar, Sidebar, ToDoList
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