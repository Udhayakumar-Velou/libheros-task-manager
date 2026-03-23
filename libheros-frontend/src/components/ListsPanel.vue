<template>
  <div class="bg-gray-100 p-5 h-full flex flex-col">

    <h2 class="text-lg font-semibold mb-4">Lists</h2>

    <!-- LISTS -->
    <div class="flex flex-col gap-2 flex-1 overflow-y-auto">

      <div
        v-for="list in lists"
        :key="list.id"
        @click="$emit('select', list)"
        :class="[
          'flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition group',
          selectedList?.id === list.id
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-200'
        ]"
      >

        <span>{{ list.name }}</span>

        <!-- DELETE -->
        <button
          @click.stop="remove(list)"
          class="opacity-0 group-hover:opacity-100"
        >
          🗑
        </button>

      </div>

    </div>

    <!-- ADD -->
    <div class="mt-4 flex gap-2">
      <input
        v-model="name"
        placeholder="New list"
        class="flex-1 border px-3 py-2 rounded"
      />

      <button
        @click="add"
        class="bg-blue-500 text-white px-4 rounded"
      >
        +
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['lists', 'selectedList'])
const emit = defineEmits(['refresh', 'select'])

const name = ref('')
const getToken = () => localStorage.getItem('token')

const add = async () => {
  console.log("TOKEN:", getToken())
  if (!name.value) return

  await axios.post(
    'http://localhost:3000/task-lists',
    { name: name.value },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )

  name.value = ''
  emit('refresh')   // 🔥 important
}

const remove = async (list) => {
  await axios.delete(
    `http://localhost:3000/task-lists/${list.id}`,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )

  emit('refresh')   // 🔥 important
}
</script>