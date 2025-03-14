<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <img class="navbar-brand" src="../assets/logo.png" />
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <slot></slot>
            <button v-show="!props.user" @click="$emit('openRegister')" class="nav-link">Register</button>
            <button v-show="!props.user" @click="$emit('openSignIn')" class="nav-link">Log In</button>
            <button v-show="props.user" class="nav-link" @click="handleSignOut">Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  </template>

<style scoped>
.navbar {
    background-color: #333333;
    height: 5vh;
}

img {
    width: 7vw;
}
</style>

<script setup>
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const props = defineProps({
  user: Object,
});
const emit = defineEmits(['openRegister', 'openSignIn']);

const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert('User signed out');
  } catch (error) {
    alert('Sign out error:', error.message);
  }
};

</script>