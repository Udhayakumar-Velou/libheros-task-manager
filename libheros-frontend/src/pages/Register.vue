<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">

      <h2 class="text-xl font-semibold text-center">Register</h2>

      <input v-model="name" placeholder="Name" class="input" />
      <input v-model="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />

      <button @click="register" class="btn">Create</button>

      <p class="text-sm text-center">
        Have account?
        <span @click="router.push('/login')" class="text-blue-500 cursor-pointer">Login</span>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  const [firstName, ...rest] = name.value.split(' ')
  const lastName = rest.join(' ') || '-'

  await axios.post('http://localhost:3000/auth/register', {
    firstName,
    lastName,
    email: email.value,
    password: password.value
  })
  router.push('/login')
}
</script>