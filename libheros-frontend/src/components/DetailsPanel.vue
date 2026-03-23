<template>
  <div class="p-6 h-full bg-gray-50">

    <h2 class="font-semibold mb-4 text-lg">Details</h2>

    <div v-if="task" class="space-y-4">

      <!-- TITLE -->
      <h3 class="text-xl font-semibold">
        {{ task.shortDescription }}
      </h3>

      <!-- DESCRIPTION -->
      <p class="text-gray-600">
        {{ task.longDescription || 'No description' }}
      </p>

      <!-- DATES -->
      <div class="text-sm text-gray-400 space-y-1">

        <p>
          Due:
          {{
            task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : 'None'
          }}
        </p>

        <!-- ✅ REQUIRED BY DOC -->
        <p>
          Created:
          {{
            task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : 'Unknown'
          }}
        </p>

      </div>

      <!-- DELETE BUTTON -->
      <button
        @click="showModal = true"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>

    </div>

    <!-- EMPTY STATE -->
    <div v-else class="text-gray-400">
      Select a task
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl w-80">

        <h3 class="font-semibold mb-2">Delete task?</h3>

        <!-- ✅ BETTER MESSAGE -->
        <p class="text-sm text-gray-500 mb-4">
          This action cannot be undone.
        </p>

        <div class="flex justify-end gap-2">
          <button
            @click="showModal=false"
            class="border px-3 py-1 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            @click="confirmDelete"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['task'])
const emit = defineEmits(['refresh'])

const showModal = ref(false)
const getToken = () => localStorage.getItem('token')

const confirmDelete = async () => {
  if (!props.task?.id) return

  await axios.delete(
    `http://localhost:3000/tasks/${props.task.id}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` }
    }
  )

  showModal.value = false
  emit('refresh')
}
</script>