<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';
import HomeView from '../views/HomeView.vue'
import { markTerms, transformDate, formatEmail } from '../utils/markEmail.js'

const searchTerm = ref("")

const BASE_API = "http://localhost:8000/"
const searchApi = axios.create({
    baseURL: BASE_API,
})

const emails = ref([])
const selectedEmail = ref()
let pageActualTotal = ref(0)
let currentPage = ref(1)
let pageSize = ref(20)
let totalPages = ref(1)
async function getAllEmail() {
    let searchUrl = "search?term="
    let response = await searchApi.get(searchUrl + searchTerm.value)
    emails.value = response.data.hits.hits.map(hit => {
        return {
            person: hit._source.person,
            email_tag: hit._source.email_tag,
            message_id: markTerms(hit._source.message_id, searchTerm.value),
            from: markTerms(hit._source.from, searchTerm.value),
            to: markTerms(hit._source.to, searchTerm.value),
            subject: (hit._source.subject) == "" ? "(no subject)" : markTerms(hit._source.subject, searchTerm.value),
            date: transformDate(hit._source.date, searchTerm.value),
            content: markTerms(hit._source.content, searchTerm.value),
        }
    })
    emails.value = Array.from(emails.value)
    currentPage.value = 1
    pageActualTotal.value = emails.value.slice((currentPage - 1) * pageSize, currentPage * pageSize).length
    totalPages.value = Math.ceil(emails.value.length / pageSize.value)
    selectedEmail.value = null
}

onBeforeMount(() => {
    getAllEmail()
})


</script>
<template>
    <HomeView></HomeView>
    <!-- search bar-->
    <div class="search-bar my-4 mx-6">
        <label for="default-search" class="px-20 mb-2 text-sm font-medium sr-only ">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 " fill="none" stroke="blue" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="search" v-model="searchTerm" id="default-search" @keyup.enter="getAllEmail()"
                class="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-tl-2xl rounded-br-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search emails..." required>
            <button type="submit" @click="getAllEmail()"
                class="text-white absolute right-2.5 bottom-2.5 bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-tl-2xl rounded-br-2xl text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Search</button>
        </div>
    </div>
    <!-- end search bar-->
    <div class="flex mb-2">
        <!-- pagination -->
        <div class="w-1/2 ">
            <div class="flex justify-center my-2 w-full">
                <button v-if="currentPage > 1"
                    class="px-2 rounded-xl text-white bg-violet-600 font-bold hover:underline mr-2"
                    @click="currentPage--">
                    Previous
                </button>
                <span class="text-black-600 mr-2">Page {{ currentPage }} of {{ totalPages }}</span>
                <button v-if="currentPage < totalPages"
                    class="px-2 rounded-xl text-white bg-blue-800 font-bold hover:underline" @click="currentPage++">
                    Next
                </button>
                <div class="text-black-600 ml-2">
                    {{ (pageSize * currentPage) - pageSize }}-{{ (pageSize * currentPage) }} of
                    {{ emails.length }}
                </div>
            </div>
        </div>
        <!-- end pagination -->
        <!-- create index -->
        <div class="w-1/2 ">
            <div class="flex text-center items-center justify-center my-2 w-full">
                <RouterLink to="/bulk" class="rounded-xl text-white bg-pink-500 font-bold px-2 ">Create index
                </RouterLink>
            </div>
        </div>
        <!-- end create index -->
    </div>
    <!-- table emails and email preview-->
    <div class="flex">
        <div class="w-1/2 ">

            <!-- table emails-->
            <div class="rounded-xl">
                <table class="w-full text-sm text-left mr-2 rounded-xl">
                    <!--header table with from, subject and date -->
                    <thead class="text-base uppercase email-head">
                        <tr>
                            <th scope="col" class="py-3 px-6 w-2/5">
                                From
                            </th>
                            <th scope="col" class="py-3 px-6 w-2/5">
                                Subject
                            </th>
                            <th scope="col" class="py-3 px-6 w-min">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <!-- end header table with from, subject and date -->
                    <tbody>
                        <tr v-for="email in emails.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                            :key="email" :class="{ 'selectable-row': email === selectedEmail }"
                            v-on:click="selectedEmail = email"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer email-body text-white">
                            <td class="w-2/5 py-4 px-6 font-medium" v-html="email.from">
                            </td>
                            <td class="py-4 px-6 w-2/5" v-html="email.subject">
                            </td>
                            <td class="py-4 px-6 w-min" v-html="email.date">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- end table emails-->
            </div>
        </div>
        <!-- email content preview-->
        <div class="w-1/2">
            <div class="h-full p-4 text-sm text-left text-black bg-sky-100 dark:text-black ml-2 border rounded-xl border-blue-600"
                v-if="selectedEmail != null" v-html="formatEmail(selectedEmail)">
            </div>
            <div class="h-full p-4 text-sm text-left text-black bg-blue-100 dark:text-black ml-2 border rounded-xl border-blue-600"
                v-else="selectedEmail">
                <h1 class="text-2xl text-center pt-10 pb-20"> No email selected </h1>
                <!--<h5 class="text-xs text-center pt-10 pb-20">Created by Jhoser Pacheco </h5>-->
                <h5 class="text-xs text-center pt-10 pb-20">Created by Jhoser Pacheco </h5>
            </div>
        </div>
        <!-- end email content preview-->
    </div>
    <!-- table emails and email preview-->
</template>

<style>
table thead {
    background-color: #12d57d;
}

.email-body {
    background-color: #16173b
}

table tr:nth-child(n+2):nth-child(even) {
    background-color: #01022e;
}

table tr:nth-child(n+2):nth-child(odd) {
    background-color: #16173b;
}

.selectable-row {
    background-color: #441fe2 !important;
}
</style>