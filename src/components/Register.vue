<template>
    <div v-if="show" class="popup-overlay" @click.self="$emit('close')">
        <div class="popup-content">
            <div class="popup-header">
                <center>
                    <h2 class="title">Register</h2>
                </center>
                <button @click="$emit('close')" class="close-btn">🗙</button>
            </div>
            <div class="form-content">
                <h4>Enter your first name. </h4>
                <input type="text" placeholder="John" name="name" class="text-input" v-model="firstName" required /><br />
                <h4>Enter your last name. </h4>
                <input type="text" placeholder="Doe" name="name" class="text-input" v-model="lastName" required/><br />
                <h4>Enter your email. </h4>
                <input type="email" placeholder="johndoe@example.com" name="email" class="text-input" v-model="email" required/><br />
                <h4>Enter a password. </h4>
                <input type="password" placeholder="Enter Password" name="password" class="text-input" v-model="password" required/>
                <h4>Confirm password. </h4>
                <input type="password" placeholder="Re-enter Password" name="password" class="text-input" v-model="confirmPassword" required/>
            </div>
            <center><button class="btn btn-dark submit-btn" @click="register">Register</button></center>
            <h2 class="pt-5 pb-5 white">Or Register With:</h2>
              <button @click="googleSignIn" class="btn btn-lg btn-outline-danger p-3 lh-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    </svg>
              </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'; // <-- Add onMounted and onUnmounted
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../firebase';
import { db } from '../firebase';
import { collection, setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const confirmPassword = ref(''); 

const register = async () => {
  if (password.value !== confirmPassword.value && firstName.value !== '' && lastName.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '') {
    alert("Passwords do not match.");
    return; // Stop the registration process
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    await signInWithEmailAndPassword(auth, email.value, password.value);
    const docRef = doc(db, 'users', email.value); 
    await setDoc(docRef, {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      tasks: {}
    });
    alert("Registration Successful: " + user.email);
    emit('close')
    window.location.reload();
  } catch (error) {
    alert("Registration Error: " + error.message);
  }
};

const googleSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // If the document doesn't exist, create it with an empty tasks field
      await setDoc(docRef, {
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1] || '',
        email: user.email,
        tasks: {} // Create a new empty task object only if it's a new user
      });
    }

    alert("Google Sign in Successful, Welcome " + user.displayName);
    emit('close');
    window.location.reload();
  } catch (error) {
    alert('Google Sign In Error: ' + error.message);
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

.title {
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

.white {
  color: #B0B0B0;
}
</style>