<template>
    <div class="container mx-auto max-w-xl py-8">
        <div class="mb-4">
            <input type="text" v-model="query" @input="searchActors" placeholder="Введите запрос на английском"
                   class="w-full p-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500">
        </div>
        <div v-if="loading" class="text-center font-medium py-4">
            Загрузка...
        </div>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="actor in actors" :key="actor.id"
                class="flex flex-col items-center border rounded-md p-4 shadow-md">
                <img :src="actor.photo" class="w-32 h-32 rounded-full object-cover mb-2">
                <a :href="`https://www.kinopoisk.ru/name/${actor.id}`">
                <div class="text-lg font-medium">{{ actor.name ?? actor.enName }}</div>
                <div class="text-gray-500">{{ actor.age }} лет</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    //import translate from 'google-translate-api';
    export default {
        name: "Search",
        data() {
            return {
                query: '',
                actors: [],
                loading: false,
            }
        },
        methods: {
            async translateName() {
                let translatedQuery = this.query
                if (/[\u0400-\u04FF]/.test(this.query)) {
                    const response = await axios.get(`https://www.wordreference.com/ruen/${this.query}`);
                    const html = new DOMParser().parseFromString(response.data, 'text/html');
                    // Находим перевод в HTML-коде страницы
                    translatedQuery  = html.querySelector('.ToWrd').textContent.trim();

                }
                return translatedQuery;
            },

            async searchActors() {
                this.loading = true;
                const name = await this.translateName()
                console.log(name)
                axios.get(`https://api.kinopoisk.dev/v1/person?movies.description=${name}`, {
                    headers:{
                        'X-API-KEY': 'YGHZGWA-5ZC4XX9-HTH03V2-Q24F4QB'
                    }
                })
                    .then(response => {
                            this.actors = response.data.docs;
                        this.loading = false;
                    });
            }
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
