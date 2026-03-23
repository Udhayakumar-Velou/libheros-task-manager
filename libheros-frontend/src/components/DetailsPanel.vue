<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['task'])
const emit = defineEmits(['refresh'])

const showModal = ref(false)
const getToken = () => localStorage.getItem('token')
console.log(getToken())


const confirmDelete = async () => {
  await axios.delete(
    `http://localhost:3000/tasks/${props.task.id}`,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )

  showModal.value = false
  emit('refresh')
}
</script>

<template>
  <div class="bg-gray-50 p-6 h-full border-l">

    <h2 class="font-semibold mb-4">Details</h2>

    <div v-if="task" class="space-y-4">

      <h3 class="text-lg font-semibold">{{ task.shortDescription }}</h3>

      <p>{{ task.longDescription || 'No description' }}</p>

      <p class="text-sm text-gray-500">
        Due:
        {{
          task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : 'None'
        }}
      </p>

      <button @click="showModal = true" class="bg-red-500 text-white px-4 py-2 rounded-xl">
        Delete
      </button>

    </div>

    <div v-else class="text-gray-400">
      Select a task
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div class="bg-white p-6 rounded-xl w-80">

        <h3 class="font-semibold mb-3">Delete task?</h3>
        <p class="text-sm text-gray-500 mb-4">This cannot be undone</p>

        <div class="flex justify-end gap-2">
          <button @click="showModal=false" class="border px-3 py-1 rounded">Cancel</button>
          <button @click="confirmDelete" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>

      </div>
    </div>

  </div>
</template>