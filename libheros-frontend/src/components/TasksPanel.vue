<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['tasks', 'selectedList'])
const emit = defineEmits(['refresh', 'selectTask'])

const shortDesc = ref('')
const longDesc = ref('')
const dueDate = ref('')

const getToken = () => localStorage.getItem('token')

onMounted(() => {
  dueDate.value = new Date().toISOString().split('T')[0]
})

const activeTasks = computed(() =>
  props.tasks.filter(t => !t.completed)
)

const completedTasks = computed(() =>
  props.tasks.filter(t => t.completed)
)

const addTask = async () => {
  if (!shortDesc.value) return

  await axios.post(
    'http://localhost:3000/tasks',
    {
      shortDescription: shortDesc.value,
      longDescription: longDesc.value,
      dueDate: dueDate.value,
      taskListId: props.selectedList.id
    },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )

  shortDesc.value = ''
  longDesc.value = ''
  dueDate.value = new Date().toISOString().split('T')[0]

  emit('refresh')
}

const toggle = async (task) => {
  await axios.patch(
    `http://localhost:3000/tasks/${task.id}`,
    { completed: !task.completed },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )

  emit('refresh')
}
</script>

<template>
  <div class="bg-white p-4 h-full flex flex-col">

    <h2 class="font-semibold mb-4">
      {{ selectedList?.name || 'Select a list' }}
    </h2>

    <div v-if="selectedList">

      <!-- FORM -->
      <div class="space-y-2 mb-4">
        <input v-model="shortDesc" placeholder="Task" class="border p-2 rounded-xl w-full" />
        <input v-model="longDesc" placeholder="Description" class="border p-2 rounded-xl w-full" />
        <input type="date" v-model="dueDate" class="border p-2 rounded-xl w-full" />

        <button @click="addTask" class="bg-blue-500 text-white p-2 rounded-xl w-full">
          Add
        </button>
      </div>

      <!-- ACTIVE -->
      <div class="space-y-2">
        <div
          v-for="task in activeTasks"
          :key="task.id"
          @click="$emit('selectTask', task)"
          class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
        >
          <div @click.stop="toggle(task)" class="w-5 h-5 border rounded-full"></div>
          {{ task.shortDescription }}
        </div>
      </div>

      <!-- COMPLETED -->
      <div v-if="completedTasks.length" class="mt-4">
        <h4 class="text-sm text-gray-500 mb-2">Completed</h4>

        <div
          v-for="task in completedTasks"
          :key="task.id"
          class="flex items-center gap-3 p-3 bg-gray-100 rounded-xl"
        >
          <div @click.stop="toggle(task)" class="w-5 h-5 bg-blue-500 rounded-full"></div>
          <span class="line-through text-gray-400">{{ task.shortDescription }}</span>
        </div>
      </div>

    </div>

  </div>
</template>