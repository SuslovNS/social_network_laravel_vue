<template>
    <div class="w-96 mx-auto">
            <Stat :stats="stats"></Stat>
        <div v-if="posts">
            <h1 class="text-center mb-4 pb-4 border-b border-gray-400">{{user.name}}`s posts</h1>
            <Post v-for="post in posts" :post="post"></Post>
        </div>
        <div v-else>
        <h2>There is no posts</h2>
        </div>
    </div>
</template>

<script>

import Post from "@/components/Post.vue";
import Stat from "../../components/Stat.vue";

export default {
    name: "Show",

    data() {
        return {
            posts: [],
            userId: this.$route.params.id,
            user: {},
            stats: []
        }
    },

    components: {
        Stat,
        Post
    },

    mounted() {
        this.getPosts()
        this.getUser()
        this.getStats()
    },

    methods: {
        getPosts() {
            axios.get(`/api/users/${this.userId}/posts`)
                .then(res => {
                    this.posts = res.data.data
                })
        },
        getStats(){
            axios.post('/api/users/stats', {user_id: this.userId})
                .then( res => {
                    this.stats = res.data.data
                })
        },

        getUser(){
            axios.get(`/api/users/get/${this.userId}`)
            .then(res => {
                this.user = res.data.data
            })
        }

    }


}
</script>

<style scoped>

</style>
