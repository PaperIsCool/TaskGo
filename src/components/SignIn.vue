<template>
    <div v-if="show" class="popup-overlay" @click.self="$emit('close')">
        <div class="popup-content">
            <div class="popup-header">
                <center>
                    <h2>Log In</h2>
                </center>
                <button @click="$emit('close')" class="close-btn">🗙</button>
            </div>
            <div class="form-content">
                <h4>Enter Your email. </h4>
                <input type="email" placeholder="johndoe@example.com" name="email" class="text-input" v-model="email" /><br />
                <h4>Enter Your Password. </h4>
                <input type="password" placeholder="Enter Password" name="password" class="text-input" v-model="password" />
            </div>
            <center><button class="btn btn-dark submit-btn" @click="login">Log In</button></center>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'; // <-- Add onMounted and onUnmounted
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user; // Move this line here
    alert("Login Successful: " + user.email);
    emit('close')
  } catch (error) {
    alert("Login Error: " + error.message);
  }
};

const handleEsc = (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  if (props.show) {
    document.addEventListener('keydown', handleEsc);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc);
});

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEsc);
  } else {
    document.removeEventListener('keydown', handleEsc);
  }
});

</script>

<style lang="css" scoped>
.text-input {
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid white;
    background-color: #3b3e45;
    color: #F5F5F5;
    width: 60vw;
    font-size: 300%;
    margin-bottom: 5%;
    text-align: left;
}
.text-input::placeholder {
    border-top: none;
    border-right: none;
    border-left: none;
    background-color: #3b3e45;
    color: #2c343c;
}
.text-input:focus {
    outline: none;
    border-top: none;
    border-right: none;
    border-left: none;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* semi-transparent black */
  backdrop-filter: blur(5px); /* blurs the background */
  display: flex;
  justify-content: center;
  align-items: center;
}
/* remove background color so it keeps the same as the page */
.popup-content {
  padding: 20px;
  height: 90vh;
  overflow-y: auto;
  width: 90vw;
  border-radius: 10px;
  background-color: #3b3e45;
}
.popup-header {
  position: relative; /* allows absolute positioning inside */
  display: flex;
  justify-content: center; /* centers the title */
  align-items: center; /* aligns items vertically */
  width: 100%;
  padding: 10px 0;
}

h2 {
  margin: 0; /* removes extra spacing */
  font-size: 300%;
  color: #F5F5F5;
}
.close-btn {
  position: absolute;
  right: 10px; /* moves it to the right */
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white; /* change based on your bg */
}
.form-content {
  width: 100%;
  padding-right: 30%;
  padding-left: 50px;
  margin-right: auto;
  margin-left: auto;
}
h4 {
    text-align: left;
}
.submit-btn {
    font-size: 160%;
    width: 40%;
}
</style>