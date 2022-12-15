<template>
    <div class="w-96 mx-auto">

        <div v-if="posts">
            <h1 class="mb-8 pb-8 border-b border-gray-400">Posts</h1>
            <Post v-for="post in posts" :post="post"></Post>
        </div>
    </div>
</template>

<script>

import Post from "@/components/Post.vue";

export default {
    name: "Personal",

    data() {
        return {
            posts: [],
            userId: this.$route.params.id
        }
    },

    components: {
        Post
    },

    mounted() {
        this.getPosts()
    },

    methods: {
        getPosts() {
            axios.get(`/api/users/${this.userId}/posts`)
                .then(res => {
                    this.posts = res.data.data
                })
        },

    }


}
</script>

<style scoped>

</style>
