<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount, onBeforeUpdate, watch } from "vue";
import axios from 'axios';
import HomeView from '../views/HomeView.vue'

function isValidNDJSON(text) {
    if (index.value == "") return false
    for (const line of text.split('\n')) {
        if (line.trim() === '') {
            continue
        }
        try {
            JSON.parse(line)
        } catch (error) {
            return false
        }
    }
    return true
}

const BASE_API = "http://localhost:8000"
const indexPost = axios.create({
    baseURL: BASE_API,
})

const index = ref("")
const text = ref("{\"greeting\":\"Hola\"}\n{\"greeting\":\"Hello\"}\n{\"greeting\":\"Salut\"}\n{\"greeting\":\"olá\"}")

const customHeaders = {
    'Content-Type': 'application/x-ndjson',
};

const responseStatus = ref(0)

function sendIndex() {
    indexPost.post('/index', {
        index: index.value,
        records: text.value.split("\n")
    },)
        .then(response => {
            responseStatus.value = response.status
        })
        .catch(error => {
            responseStatus.value = 500;
            isOpen = true
        }, customHeaders);
    setTimeout(() => {
        responseStatus.value = 0
    }, 3000)
}

</script>

<template>
    <HomeView></HomeView>

    <div class="w-screen h-screen background">
        <!--msg emergent form bulk -->
        <div v-if="responseStatus === 200"
            class="absolute top-20 right-10 bg-green-500 text-white px-4 py-3 rounded-full right-0 mr-4 mt-4 flex flex-row-reverse ">
            Index {{ index }} Bulk satisfactorily
        </div>
        <div v-if="responseStatus === 404 || responseStatus === 500"
            class="absolute top-20 right-10 bg-red-500 text-white px-4 py-3 rounded-full right-0 mr-4 mt-4 flex flex-row-reverse">
            Oops! An error has occurred
        </div>
        <div v-else="responseStatus === 0">
        </div>
        <!--end msg emergent form bulk -->
        <div class="flex text-center items-center justify-center py-4 mb-5 ">
            <h1 class="rounded-tl-xl text-white bg-violet-600 font-bold hover:underline text-4xl px-4 py-2">
                Bulk</h1>
            <h1 class=" rounded-br-xl text-white bg-blue-800 font-bold hover:underline text-4xl px-4 py-2">
                Document
            </h1>
        </div>

        <!--form bulk index-->
        <form class="max-w-screen max-h-screen">
            <div class="md:flex md:items-center">
                <div class="ml-8">
                    <label class="block text-black font-bold md:text-right pr-4" for="index">
                        Index
                    </label>
                </div>
                <!--input index -->
                <div class="md:w-1/3">
                    <input v-model="index"
                        class="required bg-blue-200 appearance-none border-2 border-blue-500 rounded-xl w-full py-2 px-4 ml-7 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="index" type="text" placeholder="Index name" required>
                </div>
                <!--end input index -->
            </div>
            <!-- input text area -->
            <div class="md:flex md:items-center h-80">
                <div class="ml-8">
                    <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-5" for="Records">
                        Records
                    </label>
                </div>
                <div class="md:w-4/5 md:h-3/4">
                    <textarea v-model="text"
                        class="bg-violet-200 border-2 border-violet-600 rounded-xl w-full h-full py-2 px-4 text-gray-800 focus:outline-none focus:bg-white focus:border-violet-500"
                        id="textarea">
                    </textarea>
                </div>
            </div>
            <!--end input text area -->
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-1/5"></div>
                <div class="md:w-2/3">
                    <button :disabled="!isValidNDJSON(text)" @click="sendIndex()"
                        class="shadow-bt bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-neutral-800 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
        <!--end form bulk index-->
    </div>

</template>

<style scoped>
::placeholder {
    color: rgb(70, 70, 70);
}

.background {
    background-color: #e6e7fe;
}

.shadow-bt {
    background-color: #00d774;
}
</style>