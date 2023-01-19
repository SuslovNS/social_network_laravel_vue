<template>
    <div class="mb-8 pb-8 border-b border-gray-400">
        <h1 class="text-xl">{{ post.title }}</h1>
        <img class="my-3 mx-auto" v-if="post.image_url" :src="post.image_url" :alt="post.title">
        <p>{{ post.content }}</p>

        <div v-if="post.reposted_post" class="bg-gray-100 p-4 my-4 border border-gray-200">
            <h2 class="text">Reposted from <router-link :to="{name: 'user.show', params:{id:post.reposted_post.user.id}}">{{post.reposted_post.user.name}}</router-link></h2>
            <h1 class="text-xl">{{ post.reposted_post.title }}</h1>
            <img class="my-3 mx-auto" v-if="post.reposted_post.image_url" :src="post.reposted_post.image_url"
                 :alt="post.reposted_post.title">
            <p>{{ post.reposted_post.content }}</p>
            <p class="text-right">{{ post.reposted_post.date }}</p>
        </div>

        <div class="flex justify-between items-center mt-2">
            <router-link class="text-slate-500 text-sm" :to="{name: 'user.show', params:{id: post.user.id}}">{{ post.user.name }}</router-link>
<!--            <p class="text-slate-500 text-sm">{{ post.userName }}</p>-->
            <p class="text-slate-500 text-sm">{{ post.date }}</p>

            <div class="flex">
                <div class="flex mr-2">
                    <svg  @click="getComments(post)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          :class="['mr-2 stroke-sky-500 cursor-pointer hover:fill-sky-500 w-6 h-6 fill-white' ]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                    </svg>
                    <p>{{post.comments_count}}</p>
                </div>

                <div class="flex mr-2">
                    <svg @click.prevent="openRepost(post)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor"
                         :class="['mr-2 stroke-sky-500 cursor-pointer hover:fill-sky-500 w-6 h-6', 'fill-white' ]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>
                    </svg>
                    <p>{{post.reposted_by_posts_count}}</p>
                </div>
                <div class="flex">
                    <svg @click.prevent="toggleLike(post)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         :class="['mr-2 stroke-sky-500 cursor-pointer hover:fill-sky-500 w-6 h-6', post.is_liked ? 'fill-sky-500' : 'fill-white' ]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                    <p>{{post.likes_count}}</p>
                </div>
            </div>
        </div>

        <div v-if="isRepost" class="mt-4">
            <div>
                <input v-model="title" class="w-96 mb-3 rounded-3xl border p-2 border-slate-400 "
                       type="text"
                       placeholder="title">
            </div>
            <div v-if="errors.title">
                <p v-for="error in errors.title" class="text-sm mt-2 text-red-500">{{error}}</p>
            </div>
            <div>
                            <textarea v-model="content" class="w-96 mb-3 rounded-3xl border p-2 border-slate-400 "
                                      placeholder="content"></textarea>
            </div>
            <div v-if="errors.content">
                <p v-for="error in errors.content" class="text-sm mt-2 text-red-500">{{error}}</p>
            </div>
            <div>
                <a @click.prevent="repost(post)" href="#" class="block p-2 w-32 text-center rounded-3xl bg-green-600 text-white
            hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ml-auto">Repost</a>
            </div>
        </div>
        <div v-if="post.comments_count > 0" class="mt-4">
<!--            <p v-if="!isShowed" @click="getComments(post)" class="text-center cursor-pointer">Show {{post.comments_count}} comments</p>-->
            <p v-if="isShowed" @click="isShowed = false" class="text-center cursor-pointer">Close comments</p>
            <div v-if="comments && isShowed">
                <div v-for="comment in comments" class="mt-4 pt-4 border-t border-gray-300">
                    <div class="flex mb-2">
                    <p class="text-sm mr-2">{{comment.user.name}}</p>
                        <p @click="setParentId(comment)" class="cursor-pointer text-sm text-sky-500">Answer</p>
                </div>
                    <p><span v-if="comment.answered_for_user" class="text-sky-400">{{comment.answered_for_user ? comment.answered_for_user : ''}}, </span> {{comment.body}}</p>
                    <p class="text-right text-sm">{{comment.date}}</p>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="mb-3">
                <div class="flex items-center">
                <p v-if="comment" class="mr-2">Answer for {{comment.user.name}}</p>
                <p v-if="comment" @click="comment = null" class="cursor-pointer text-sm text-sky-300">Cancel</p>
                </div>
                    <input v-model="body" class="w-96 mb-3 rounded-3xl border p-2 border-slate-400 " type="text"
                           placeholder="comment">
            </div>
                <div>
                    <a @click.prevent="storeComment(post)" href="#" class="block p-2 w-32 text-center rounded-3xl bg-green-600 text-white
            hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ml-auto">Comment</a>
                </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Post",

        props: [
            'post'
        ],

        data() {
            return {
                title: '',
                content: '',
                body: '',
                isRepost: false,
                repostedId: null,
                errors: [],
                comments: [],
                isShowed: false,
                comment: null
            }
        },

        methods: {
            toggleLike(post) {
                axios.post(`/api/posts/${post.id}/toggle_like`)
                    .then(res => {
                        post.is_liked = res.data.is_liked
                        post.likes_count = res.data.likes_count
                    })
            },

            setParentId(comment){
                this.comment = comment
            },

            storeComment(post) {
                const commentId = this.comment ? this.comment.id : null
                axios.post(`/api/posts/${post.id}/comment`, {body: this.body, parent_id: commentId})
                    .then(res => {
                        this.body = ''
                        this.comments.unshift(res.data.data)
                        this.comment = null
                        post.comments_count++
                        this.isShowed = true
                    })
            },

            getComments(post) {
                axios.get(`/api/posts/${post.id}/comment`)
                    .then(res => {
                        this.comments = res.data.data
                        this.isShowed = true
                    })
            },

            openRepost() {
                if (this.$route.name === 'user.personal') return
                this.isRepost = !this.isRepost
            },

            repost(post) {
                if (this.$route.name === 'user.personal') return
                axios.post(`/api/posts/${post.id}/repost`, {title: this.title, content: this.content})
                    .then(res => {
                        this.title = ''
                        this.content = ''
                        post.reposted_by_posts_count++
                    })
                    .catch(e => {
                        this.errors = e.response.data.errors
                    })
            }
        }
    }
</script>

<style scoped>

</style>
