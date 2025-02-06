<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const message = ref('Welcome to the Home Page!');
const router = useRouter();
const isLoggedIn = ref(false); // Add a reactive state for login status

const goToLogin = () => {
    router.push('/login');
};

const goToRegister = () => {
    router.push('/register');
};

const logout = () => {
    isLoggedIn.value = false; // Set login status to false
    // Add any additional logout logic here
};
</script>

<template>
    <div class="home-container">
        <div class="top-left-buttons">
            <button v-if="!isLoggedIn" @click="goToLogin">Login</button>
            <button v-if="!isLoggedIn" @click="goToRegister">Register</button>
            <button v-if="isLoggedIn" @click="logout">Logout</button>
        </div>
        <h1>{{ message }}</h1>
    </div>
</template>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    position: relative;
}

.top-left-buttons {
    position: absolute;
    top: 20px;
    left: 20px;
}

button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

h1 {
    color: #333;
}
</style>