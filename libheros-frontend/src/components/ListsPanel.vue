<template>
  <div class="p-4 h-full flex flex-col bg-white">

    <!-- HEADER -->
    <h2 class="text-lg font-semibold mb-4">Lists</h2>

    <!-- LISTS -->
    <div class="flex-1 overflow-y-auto space-y-1">

      <!-- EMPTY STATE -->
      <div v-if="!lists?.length" class="text-gray-400 text-sm px-2">
        No lists yet
      </div>

      <div
        v-for="list in lists"
        :key="list.id"
        @click="$emit('select', list)"
        :class="[
          'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer group transition',
          selectedList?.id === list.id
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-100'
        ]"
      >
        <span class="truncate">{{ list.name }}</span>

        <!-- DELETE -->
        <button
          @click.stop="openDelete(list)"
          class="opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition"
        >
          🗑
        </button>
      </div>

    </div>

    <!-- ADD -->
    <div class="mt-4 flex gap-2">
      <input
        v-model="name"
        @keyup.enter="add"
        placeholder="New list"
        class="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        @click="add"
        class="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl w-80">

        <h3 class="font-semibold mb-2">Delete list?</h3>

        
        <p class="text-sm text-gray-500 mb-4">
          This will delete all tasks inside this list. This action cannot be undone.
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

const props = defineProps(['lists', 'selectedList'])
const emit = defineEmits(['refresh', 'select'])

const name = ref('')
const showModal = ref(false)
const selected = ref(null)

const getToken = () => localStorage.getItem('token')

const add = async () => {
  if (!name.value.trim()) return

  await axios.post(
    `${import.meta.env.VITE_API_URL}/task-lists`,
    { name: name.value },
    {
      headers: { Authorization: `Bearer ${getToken()}` }
  }
  )

  name.value = ''
  emit('refresh')
}

const openDelete = (list) => {
  selected.value = list
  showModal.value = true
}

const confirmDelete = async () => {
  if (!selected.value?.id) return

  await axios.delete(
    `${import.meta.env.VITE_API_URL}/task-lists/${selected.value.id}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` }
    }
  )

  showModal.value = false
  emit('refresh')
}
</script>