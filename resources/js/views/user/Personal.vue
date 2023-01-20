<template>
    <div class="w-96 mx-auto">
        <Stat :stats ="stats"></Stat>
        <div class="flex justify-center" v-if="!adding">
            <svg  @click="adding = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  :class="['mr-2 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6', 'fill-white' ]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Add post</p>
        </div>
        <div v-if="adding" @click="adding = false" class="cursor-pointer text-center">Close</div>
        <div v-if="adding" class="mb-4">
            <div class="mb-3">
                <input v-model="title" class="w-96  rounded-3xl border p-2 border-slate-400 " type="text"
                       placeholder="title">
            </div>
            <div v-if="errors.title">
                <p v-for="error in errors.title" class="text-sm mt-2 text-red-500">{{error}}</p>
            </div>
            <div class="mb-3">
            <textarea v-model="content" class="w-96  rounded-3xl border p-2 border-slate-400 "
                      placeholder="content"></textarea>
            </div>
            <div v-if="errors.content">
                <p v-for="error in errors.content" class="text-sm mt-2 text-red-500">{{error}}</p>
            </div>
            <div class="flex mb-3 items-center">
                <div>
                    <input @change="storeImage" ref="file" type="file" class="hidden">
                    <a href="#" class="block p-2 w-26 text-sm text-center rounded-3xl bg-sky-500 text-white"
                       @click.prevent="selectFile()">Add image</a>
                </div>
                <div v-if="image">
                    <a href="#" @click.prevent="image = null" class="ml-3">Cancel</a>
                </div>
            </div>
            <div v-if="image">
                <img :src="image.url" alt="preview">
            </div>
            <div>
                <a @click.prevent="store" href="#" class="block p-2 w-32 text-center rounded-3xl bg-red-600 text-white
            hover:bg-white hover:border hover:border-red-600 hover:text-red-600 ml-auto">Publish</a>
            </div>
        </div>
        <div v-if="posts">
            <h1 class="mb-8 pb-4 border-b border-gray-400">Posts</h1>
            <Post v-for="post in posts" :post="post"></Post>
        </div>
    </div>
</template>

<script>

import Post from "@/components/Post.vue";
import Stat from "@/components/Stat.vue";
export default {
    name: "Personal",

    data() {
        return {
            title: '',
            content: '',
            image: null,
            posts: [],
            errors: [],
            stats: [],
            adding: false
        }
    },

    components:{
        Post,
        Stat
    },

    mounted() {
        this.getPosts()
        this.getStats()
    },

    methods: {
        getStats(){
          axios.post('/api/users/stats', {id: null})
            .then( res => {
                this.stats = res.data.data
            })
        },

        getPosts() {
            axios.get('/api/posts')
                .then(res => {
                    this.posts = res.data.data
                })
        },

        store() {
            const id = this.image ? this.image.id : null
            axios.post('/api/posts', {title: this.title, content: this.content, image_id: id})
                .then(res => {
                    this.title = ''
                    this.content = ''
                    this.image = null
                    this.posts.unshift(res.data.data)
                })
            .catch( e => {
               this.errors = e.response.data.errors
            })
        },
        selectFile() {
            this.fileInput = this.$refs.file;
            this.fileInput.click();
        },
        storeImage(e) {
            let file = e.target.files[0]
            const formData = new FormData()
            formData.append('image', file)
            axios.post('/api/post_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.image = res.data.data
                })
        },

    }


}
</script>

<style scoped>

</style>
