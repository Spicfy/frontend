<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const message = ref('Welcome to the Home Page!');




const router = useRouter();
const isLoggedIn = ref(false); // Add a reactive state for login status

const TOKEN_KEY = 'access_token';



const getAccessToken = () => {
    const cookieString = document.cookie;
    
    const cookies = cookieString.split(';');
    console.log('Cookies:', cookies);

    for(let i = 0; i < cookies.length; i++){
        const cookie = cookies[i].trim();
        if(cookie.startsWith(TOKEN_KEY + '=')){
            return cookie.substring((TOKEN_KEY).length +1);
        }
    }
    return null;
}



const removeToken = () => {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
const checkLoginStatus = () => {
    console.log('Checking login status...');
    const token = getAccessToken();
    console.log('Access token:', token);

    isLoggedIn.value = token !== null;
}




const goToLogin = () => {
    router.push('/login');
};

const goToRegister = () => {
    router.push('/register');
};

const logout = async () => {
    try{
        const token = getAccessToken();
        const response = await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok){
            removeToken();
            isLoggedIn.value = false;
            router.push('/');
        }else{
            console.error('Logout failed:', response.statusText);
            alert('Logout failed: ' + response.statusText);
        }
    }catch(error){
        console.error('Logout failed:', error.message);
        alert('Logout failed: ' + error.message);
    }
    
};
const goToSettings = () => {
    router.push('/settings')
}

watchEffect(() => {
    checkLoginStatus();
})
</script>

<template>
    <div class="container">
      <header class="top">
        <p>Passafund software engineering assignment v1.1</p>
          <div class="top-left-buttons">
              <button v-if="!isLoggedIn" @click="goToLogin">Login</button>
              <button v-if="!isLoggedIn" @click="goToRegister">Register</button>
              <button v-if="isLoggedIn" @click="logout">Logout</button>
              <button v-if="isLoggedIn" @click="goToSettings">User Settings</button>
          </div>
      
      </header>
  
      <main class="home-container">
        <h1>{{ message }}</h1>
      </main>
    </div>
  </template>
  
  <style scoped>
  .container {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      position: relative;
  }
  .top {
    height: 100px;
      margin: 0;
      color: #333;
      width: 100%;
      background-color: #007bff;
      padding: 20px; /* Add some padding */
      position: relative; /* Needed for absolute positioning of buttons */
  }
  
  .top p {
      color: white; /* Change text to white for visibility */
      font-size: 20px;
      text-align: center;
      margin: 0; /* Reset paragraph margins */
  }
  
  .top-left-buttons {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 10px;
      
  
  }
  .home-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 200px); /* Use remaining height */
      background-color: #f0f0f0;
  
  }
  
  button {
      padding: 10px 20px;
      background-color: white;
      color: black;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  
  button:hover {
      background-color: #0056b3;
  }
  
  h1 {
      color: #333;
      margin: 0;
      font-size: 2em;
  }
  </style>