<template>
    <div class="w-96 mx-auto">
        <div v-if="users">
            <div class="flex justify-between items-center mb-6 pb-6 border-b border-gray-400" v-for="user in users">
                <router-link :to="{name: 'user.show', params: {id:user.id}}">
                    <p>{{user.name}}</p>
                    <p>{{user.email}}</p>
                </router-link>
                <div  class="block p-2 w-32 text-sm text-center rounded-3xl bg-white text-sky-500 border border-sky-500">
                    <router-link :to="{name: 'chat.user', params: {userId:user.id}}">
                        <p>
                            Start chat
                        </p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "Index",

        data() {
            return {
                users: []
            }
        },

        mounted() {
            this.getUsers()
        },

        methods: {
            getUsers() {
                axios.get('/api/users')
                    .then(res => {
                        this.users = res.data.data
                    })
            },

        }
    }
</script>

<style scoped>

</style>
