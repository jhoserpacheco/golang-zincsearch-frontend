<script setup>
import HomeView from './views/HomeView.vue'
import { ref, onMounted } from "vue";
import SearchBarView from './views/searchBarView.vue';
import Emails from './components/Emails.vue';

const input = ref("")
const props = defineProps({
  term: String,
})

</script>

<template>
  <HomeView></HomeView>
  <!-- search bar-->
  <div class="search-bar">
    <label for="default-search" class="px-20 mb-2 text-sm font-medium sr-only ">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" class="w-5 h-5 " fill="none" stroke="blue" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input type="search" v-model="input" id="default-search"
        class="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search emails..." required>
      <button type="submit"
        class="text-white absolute right-2.5 bottom-2.5 bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Search</button>
    </div>
  </div>
  <!-- end search bar-->
  <Emails :searchTerm="input"></Emails>

</template>

<style scoped>

</style>
