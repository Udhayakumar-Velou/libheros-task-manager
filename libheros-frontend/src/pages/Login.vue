<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">

      <h2 class="text-xl font-semibold text-center">Login</h2>

      <input v-model="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />

      <button @click="login" class="btn">Login</button>

      <p class="text-sm text-center">
        No account?
        <span @click="router.push('/register')" class="text-blue-500 cursor-pointer">Register</span>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    // 🔥 FORCE FULL RELOAD (IMPORTANT)
    window.location.href = '/home'

  } catch (err) {
    alert('Invalid credentials')
  }
}
</script>

<style>
.input { @apply w-full border p-3 rounded-xl }
.btn { @apply w-full bg-blue-500 text-white p-3 rounded-xl }
</style>