<template>
  <div class="flex flex-col h-screen bg-gray-50">

    <!-- HEADER -->
    <div class="h-14 bg-white border-b flex justify-between px-6 items-center">
      <h1 class="font-semibold text-lg">Task Manager</h1>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {{ user?.name?.[0] || 'U' }}
        </div>

        <span class="text-sm text-gray-700">{{ user?.name || 'User' }}</span>

        <button @click="logout" class="text-sm text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </div>

    <!-- BODY -->
    <div class="flex flex-1 overflow-hidden">

      <ListsPanel
        class="w-1/4 border-r bg-white"
        :lists="lists"
        :selectedList="selectedList"
        @select="selectList"
        @refresh="fetchLists"
      />

      <TasksPanel
        class="w-2/4"
        :tasks="tasks"
        :selectedList="selectedList"
        @refresh="fetchTasks"
        @selectTask="selectedTask = $event"
      />

      <DetailsPanel
        class="w-1/4 border-l bg-white"
        :task="selectedTask"
        @refresh="fetchTasks"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import ListsPanel from '../components/ListsPanel.vue'
import TasksPanel from '../components/TasksPanel.vue'
import DetailsPanel from '../components/DetailsPanel.vue'

const lists = ref([])
const tasks = ref([])
const selectedList = ref(null)
const selectedTask = ref(null)
const user = ref({})

const router = useRouter()

onMounted(() => init())

const init = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/login')
    return
  }

  try {
    const storedUser = localStorage.getItem('user')
    user.value = storedUser ? JSON.parse(storedUser) : {}
  } catch {
    user.value = {}
  }

  await fetchLists()
}

const fetchLists = async () => {
  const API = import.meta.env.VITE_API_URL;
  try {
    const res = await axios.get(`${API}/task-lists`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    lists.value = res.data || []

    if (lists.value.length > 0) {
      selectedList.value = lists.value[0]
      await fetchTasks()
    }

  } catch {
    lists.value = []
  }
}

const fetchTasks = async () => {
  if (!selectedList.value) return

  const API = import.meta.env.VITE_API_URL;

  const res = await axios.get(
    `${API}/tasks?listId=${selectedList.value.id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )

  tasks.value = res.data || []
}

const selectList = async (list) => {
  selectedList.value = list
  selectedTask.value = null
  await fetchTasks()
}

const logout = () => {
  localStorage.clear()
  window.location.href = '/login'
}
</script>