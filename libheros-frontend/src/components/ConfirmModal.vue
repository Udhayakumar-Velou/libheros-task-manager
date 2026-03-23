<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div class="bg-white rounded-2xl p-6 w-80 shadow-lg">

      <h3 class="text-lg font-semibold mb-3">
        {{ title }}
      </h3>

      <p class="text-sm text-gray-600 mb-5">
        {{ message }}
      </p>

      <div class="flex justify-end gap-3">

        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded-lg bg-red-500 text-white"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
defineProps(['title', 'message'])
</script>