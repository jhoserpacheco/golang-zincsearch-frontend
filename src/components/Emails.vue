<script setup>
import { ref, onMounted, watch } from "vue";
import axios from 'axios';
import { markTerms, transformDate, formatEmail } from '../utils/markEmail.js'


const props = defineProps({
    searchTerm: String,
})

const BASE_API = "http://localhost:8000/"
const searchApi = axios.create({
    baseURL: BASE_API,
})

const emails = ref([])
const selectedEmail = ref()
let currentPage = ref(1)
let pageSize = ref(10)
let totalPages = ref(1)
async function getAllEmail() {
    let searchUrl = "search?term="
    let response = await searchApi.get(searchUrl + props.searchTerm)
    emails.value = response.data.hits.hits.map(hit => {
        return {
            person: hit._source.person,
            email_tag: hit._source.email_tag,
            message_id: markTerms(hit._source.message_id, props.searchTerm),
            from: markTerms(hit._source.from, props.searchTerm),
            to: markTerms(hit._source.to, props.searchTerm),
            subject: markTerms(hit._source.subject, props.searchTerm),
            date: transformDate(hit._source.date, props.searchTerm),
            content: markTerms(formatEmail(hit._source), props.searchTerm),
        }
    })
    emails.value = Array.from(emails.value)
}

onMounted(() => {
    watch(() => props.searchTerm, () => {
        getAllEmail()
        currentPage.value = 1
        pageSize.value = 10
        totalPages.value = Math.ceil(emails.value.length / pageSize.value)
        selectedEmail.value = null
    });
})


</script>
<template>

    <div @change="getAllEmail()">
        <div class="flex">
            <div class="w-1/2">
                <div>
                    <!-- Muestra la paginación -->
                    <div class="flex justify-center mt-4">
                        <button v-if="currentPage > 1" class="text-blue-500 font-bold hover:underline mr-2"
                            @click="currentPage--">
                            Anterior
                        </button>
                        <span class="text-gray-600 font-bold mr-2">Página {{ currentPage }} de {{ totalPages }}</span>
                        <button v-if="currentPage < totalPages" class="text-blue-500 font-bold hover:underline"
                            @click="currentPage++">
                            Siguiente
                        </button>
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6 w-2/5">
                                From
                            </th>
                            <th scope="col" class="py-3 px-6 w-2/5">
                                Subject
                            </th>
                            <th scope="col" class="py-3 px-6  w-min">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="email in emails.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                            :key="email" :class="{ 'selectable-row': email === selectedEmail }"
                            v-on:click="selectedEmail = email"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="w-2/5 py-4 px-6 font-medium text-gray-900 dark:text-white" v-html="email.from">
                            </td>
                            <td class="py-4 px-6 w-2/5" v-html="email.subject">
                            </td>
                            <td class="py-4 px-6 w-min" v-html="email.date">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-1/2 p-4 text-sm text-left text-gray-500 dark:bg-gray-800 dark:text-white"
                v-if="selectedEmail != null" v-html="selectedEmail.content">
            </div>
            <div class="w-1/2 p-4 text-sm text-left text-gray-500 dark:bg-gray-800 dark:text-white"
                v-else="selectedEmail">
                <h1 class="text-2xl text-center pt-10 pb-20"> No email selected </h1>
                <h5 class="text-xs text-center pt-10 pb-30"> Created by Jhoser Pacheco </h5>
            </div>
        </div>
    </div>
</template>

<style>
.selectable-row {
    background-color: #ddd;
}
</style>