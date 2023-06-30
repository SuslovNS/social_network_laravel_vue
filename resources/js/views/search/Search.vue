<template>
    <div class="container mx-auto max-w-xl py-8">
        <div class="mb-4">
            <input type="text" v-model.trim="query" v-on:keyup.enter="searchDefault"
                   placeholder="Введите запрос на английском"
                   class="w-full p-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500">
            <button @click="searchDefault" class="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white">Искать</button>
        </div>
        <div v-if="loading" class="text-center font-medium py-4">
            Загрузка результатов...
        </div>
        <div v-if="actors.length === 0" class="text-center font-medium py-4">
            Ничего не найдено. Попробуйте ввести запрос на английском языке
        </div>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="actor in actors" :key="actor.id"
                class="flex flex-col items-center border rounded-md p-4 shadow-md">
                <img :src="actor.photo ?? defaultPhoto" class="w-32 h-32 rounded-full object-cover mb-2">
                <a :href="`https://www.kinopoisk.ru/name/${actor.id}`">
                    <div class="text-lg font-medium">{{ actor.name ?? actor.enName }}</div>
                    <div v-if="actor.age" class="text-gray-500">{{ actor.age }} лет</div>
                </a>
            </li>
        </ul>
        <div v-if="actors.length > 0" class="flex justify-center mt-8">
            <button @click.prevent="fetchPreviousPage" :disabled="currentPage === 1"
                    class="px-4 py-2 rounded-md bg-blue-500 text-white mr-2">Предыдущая страница
            </button>
            <p class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2">{{ currentPage }} из {{ totalPages }}</p>
            <button @click.prevent="fetchNextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 rounded-md bg-blue-500 text-white ml-2">Следующая страница
            </button>
        </div>
        <div v-if="error" class="flex justify-center mt-4 text-red-500">
            {{ error }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                query: '',
                actors: [],
                loading: false,
                error: null,
                currentPage: 1,
                perPage: 50,
                defaultPhoto: "https://via.placeholder.com/150x150?text=No+Photo",
            }
        },
        methods: {
            fetchPreviousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.searchActors();
                }
            },
            fetchNextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.searchActors();
                }
            },
            searchDefault() {
                this.currentPage = 1
                this.searchActors()
            },

            async searchActors() {
                    const capitalizedWords = this.query.split(' ').map(word => {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    });
                    const capitalizedQuery = capitalizedWords.join(' ');
                    this.loading = true;
                    axios.get(`https://api.kinopoisk.dev/v1/person?movies.description=${capitalizedQuery}&page=${this.currentPage}&limit=${this.perPage}`, {
                        headers: {
                            'X-API-KEY': 'YGHZGWA-5ZC4XX9-HTH03V2-Q24F4QB'
                        }
                    })
                        .then(response => {
                            this.actors = response.data.docs;
                            this.totalPages = response.data.pages;
                            this.totalActors = response.data.total;
                            this.loading = false;
                        })
                        .catch(error => {
                            this.loading = false;
                            this.actors = [];
                            this.totalPages = 0;
                            this.totalActors = 0;
                            this.error = "Произошла ошибка при загрузке данных";
                        });
            },


        }

    }
</script>
<style scoped>
    input[type="text"] {
        transition: border-color 0.2s ease-in-out;
    }

    input[type="text"]:focus {
        border-color: #2563eb;
    }

    li:hover {
        border-color: #2563eb;
    }
</style>
