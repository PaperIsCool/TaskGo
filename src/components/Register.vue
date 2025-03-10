<template>
    <div v-if="show" class="popup-overlay" @click.self="$emit('close')">
        <div class="popup-content">
            <div class="popup-header">
                <center>
                    <h2>Register</h2>
                </center>
                <button @click="$emit('close')" class="close-btn">🗙</button>
            </div>
            <div class="form-content">
                <h4>Enter your first name. </h4>
                <input type="text" placeholder="John" name="name" class="text-input"/><br />
                <h4>Enter your last name. </h4>
                <input type="text" placeholder="Doe" name="name" class="text-input"/><br />
                <h4>Create a username. </h4>
                <input type="text" placeholder="johndoe123" name="username" class="text-input" /><br />
                <h4>Enter your email. </h4>
                <input type="email" placeholder="johndoe@example.com" name="email" class="text-input" /><br />
                <h4>Enter a password. </h4>
                <input type="password" placeholder="Enter Password" name="password" class="text-input" />
                <h4>Confirm password. </h4>
                <input type="password" placeholder="Re-enter Password" name="password" class="text-input" />
            </div>
            <center><button class="btn btn-dark submit-btn">Register</button></center>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    props: {
        show: Boolean
    },
    watch: {
        show(newVal) {
            if (newVal) {
                document.addEventListener("keydown", this.handleEsc);
            } else {
                document.removeEventListener("keydown", this.handleEsc);
            }
        }
    },
    methods: {
        handleEsc(event) {
            if (event.key === "Escape") {
                this.$emit("close");
            }
        }
    }
}
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