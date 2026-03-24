<template>
  <div class="h-full flex flex-col px-6 py-4 bg-gray-50">

    <h2 class="text-xl font-semibold mb-4">
      {{ selectedList?.name || 'Select a list' }}
    </h2>

    
    <div v-if="!selectedList" class="text-gray-400">
      Select a list to view tasks
    </div>

    <div v-else class="flex flex-col h-full">

      <!-- INPUT -->
      <div class="bg-white border rounded-xl p-4 mb-4 shadow-sm">

        <input
          v-model="shortDesc"
          @keyup.enter="addTask"
          placeholder="Add a task..."
          class="w-full text-lg outline-none mb-2"
        />

        <div class="flex gap-2">
          <input
            v-model="longDesc"
            placeholder="Description"
            class="flex-1 text-sm border rounded px-2 py-1"
          />

          <input
            type="date"
            v-model="dueDate"
            class="text-sm border rounded px-2 py-1"
          />

          <button
            @click="addTask"
            class="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

      </div>

      <!-- ACTIVE TASKS -->
      <div class="flex-1 overflow-y-auto space-y-1">

        <!-- EMPTY -->
        <div v-if="!activeTasks.length" class="text-gray-400 text-sm px-2">
          No tasks yet
        </div>

        <div
          v-for="task in activeTasks"
          :key="task.id"
          @click="$emit('selectTask', task)"
          class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white cursor-pointer group transition"
        >
          <div
            @click.stop="toggle(task)"
            class="w-5 h-5 border rounded-full hover:border-blue-500"
          ></div>

          <span class="flex-1">
            {{ task.shortDescription }}
          </span>
        </div>

      </div>

      
      <div v-if="completedTasks.length" class="mt-4">

        <button
          @click="showCompleted = !showCompleted"
          class="text-sm text-gray-500 mb-2 hover:underline"
        >
          {{ showCompleted ? 'Hide completed' : 'Show completed' }}
        </button>

        <div v-if="showCompleted">

          <div
            v-for="task in completedTasks"
            :key="task.id"
            class="flex items-center gap-3 px-3 py-2 bg-white rounded-lg"
          >
            <div
              @click.stop="toggle(task)"
              class="w-5 h-5 bg-blue-500 rounded-full"
            ></div>

            <span class="line-through text-gray-400">
              {{ task.shortDescription }}
            </span>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['tasks', 'selectedList'])
const emit = defineEmits(['refresh', 'selectTask'])

const shortDesc = ref('')
const longDesc = ref('')
const dueDate = ref('')
const showCompleted = ref(false)

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
  if (!shortDesc.value.trim()) return

 await axios.post(
  `${import.meta.env.VITE_API_URL}/tasks`,
  {
    shortDescription: shortDesc.value,
    longDescription: longDesc.value,
    dueDate: dueDate.value,
    taskListId: props.selectedList.id
  },
  {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
)

  shortDesc.value = ''
  longDesc.value = ''
  dueDate.value = new Date().toISOString().split('T')[0]

  emit('refresh')
}

const toggle = async (task) => {
  await axios.patch(
  `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
    { completed: !task.completed },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )

  emit('refresh')
}
</script>