<script setup lang="ts">
  import { defineProps, ref } from "vue"
  import { type Todo } from "../App.vue"

  const props = defineProps<{
    todo: Todo,
    onDelete: () => void,
    onUpdate: (title: string, desc: string) => void
  }>()

  const titleInput = ref(props.todo.title)
  const descInput = ref(props.todo.description)

  const isBeingEdited = ref(false)

  const toggle = () => {
    isBeingEdited.value = !isBeingEdited.value
  }

  const update = () => {
    props.onUpdate(titleInput.value, descInput.value)
    isBeingEdited.value = false
  }
</script>

<template>
  <div class="p-2 rounded-md border-2 border-gray-500">
    <h1 v-if="!isBeingEdited">
      Title: {{ props.todo.title }}
    </h1>
    <input placeholder="Title" v-else v-model="titleInput" />

    <p v-if="!isBeingEdited">
      Description: {{ props.todo.description }}
    </p>
    <input placeholder="Description" v-else v-model="descInput" />

    <div class="flex gap-2">
      <button class="rounded-md border-2 bg-gray-900 text-white p-2" @click="toggle">
        <span v-if="!isBeingEdited">Edit</span>
        <span v-else>Cancel</span>
      </button>
      <button class="rounded-md border-2 bg-gray-900 text-white p-2" @click="onDelete">Delete</button>
      <button class="rounded-md border-2 bg-gray-900 text-white p-2" @click="update">Update</button>
    </div>
  </div>
</template>

<style scoped>
</style>
