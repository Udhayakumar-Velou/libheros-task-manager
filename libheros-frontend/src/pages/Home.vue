<template>
  <div class="flex flex-col h-screen bg-gray-100">

    <!-- HEADER -->
    <div class="h-14 bg-white border-b flex justify-between px-6 items-center">
      <h1 class="font-semibold">Task Manager</h1>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {{ user?.name?.[0] || 'U' }}
        </div>

        <span>{{ user?.name || 'User' }}</span>

        <button @click="logout" class="text-red-500">Logout</button>
      </div>
    </div>

    <!-- BODY -->
    <div class="flex flex-1 overflow-hidden">

      <!-- LEFT -->
      <ListsPanel
        class="w-1/4"
        :lists="lists"
        :selectedList="selectedList"
        @select="selectList"
        @refresh="fetchLists"
      />

      <!-- CENTER -->
      <TasksPanel
        class="w-2/4"
        :tasks="tasks"
        :selectedList="selectedList"
        @refresh="fetchTasks"
        @selectTask="selectedTask = $event"
      />

      <!-- RIGHT -->
      <DetailsPanel
        class="w-1/4"
        :task="selectedTask"
        @refresh="fetchTasks"
      />

    </div>
  </div>
</template>

<script setup>
console.log("HOME LOADED")

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

onMounted(() => {
  init()
})

const init = async () => {
  console.log("INIT RUNNING")

  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/login')
    return
  }

  try {
    const storedUser = localStorage.getItem('user')
    user.value = storedUser && storedUser !== 'undefined'
      ? JSON.parse(storedUser)
      : {}
  } catch {
    user.value = {}
  }

  await fetchLists()
}

const fetchLists = async () => {
  console.log("FETCH LISTS CALLED")

  try {
    const token = localStorage.getItem('token')

    const res = await axios.get('http://localhost:3000/task-lists', {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log("LISTS DATA:", res.data)

    lists.value = res.data || []

    if (lists.value.length > 0) {
      selectedList.value = lists.value[0]
      await fetchTasks()
    } else {
      selectedList.value = null
      tasks.value = []
    }

  } catch (err) {
    console.error('LIST ERROR:', err)
    lists.value = []
  }
}

const fetchTasks = async () => {
  if (!selectedList.value) return

  try {
    const token = localStorage.getItem('token')

    const res = await axios.get(
      `http://localhost:3000/tasks?listId=${selectedList.value.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log("TASKS DATA:", res.data)

    tasks.value = res.data || []

  } catch (err) {
    console.error('TASK ERROR:', err)
  }
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