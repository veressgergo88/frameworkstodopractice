<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import Header from './components/Header.vue'
  import Todo from './components/Todo.vue'

  export type Todo = {
    id: number
    title: string
    description: string
    isCompleted: boolean
  }

  let titleInput = ref("")  
  let descInput = ref("")

  const existingTodos = localStorage.getItem("todos")
  const _todos = existingTodos ? JSON.parse(existingTodos) : []
  const todos = ref<Todo[]>(_todos)

  watchEffect(() => localStorage.setItem("todos", JSON.stringify(todos.value)))

  const addTodo = () => {
    todos.value = [
      ...todos.value,
      { id: Math.random(), title: titleInput.value, description: descInput.value, isCompleted: false }
    ]
    titleInput.value = ""
    descInput.value = ""
  }

  const updateTodo = (id: number) => (title: string, description: string) => {
    todos.value = todos.value.map(todo => todo.id === id ?
      { ...todo, title, description } :
      todo)
  }

  const deleteOne = (id: number) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  const deleteAll = () => {
    todos.value = []
  }
</script>

<template>
  <main class="max-w-[800px] m-auto min-h-screen bg-gray-400">
    <Header>My todo app</Header>
  
    <div class="border-2 rounded-md p-4 border-gray-800 flex flex-col items-center gap-4 max-w-[400px] m-auto">
      <input class="p-2" placeholder="Title" type="text" v-model="titleInput">
      <input class="p-2" placeholder="Description" type="text" v-model="descInput">
      <button class="rounded-md border-2 bg-gray-900 text-white p-2" @click="addTodo">Add todo</button>
    </div>
    
    <hr class="my-4">
    
    <button class="rounded-md border-2 bg-gray-900 text-white p-2 m-auto block" @click="deleteAll">Delete all</button>
  
    <hr class="my-4">
  
    <Header>Todos</Header>
  
    <div v-for="todo in todos" class="flex flex-wrap gap-4 m-4">
      <Todo
        :todo="todo"
        :onDelete="() => deleteOne(todo.id)"
        :onUpdate="updateTodo(todo.id)" />
    </div>
  </main>
</template>

<style scoped>
</style>
