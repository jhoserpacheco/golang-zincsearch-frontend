<template>
    <h1>
        Hola
    </h1>
    <form class="flex items-center">
        <label for="voice-search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <img src="../assets/icons8-busqueda.gif" alt="search icon">
            </div>
            <input type="text" id="voice-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search Mockups, Logos, Design Templates..." required>
        </div>
        <button type="submit">Search</button>
    </form>
</template>

<script>

import { ref, onMounted } from 'vue'
export default {
    setup() {
        const searchTerm = ref("")
        function search() {
            console.log("Le di search() ", searchTerm.value)
        }
        onMounted(() => {
            search()
            console.log("mounted")

        })
        return {
            searchTerm,
            search
        }
    }
}

</script>
