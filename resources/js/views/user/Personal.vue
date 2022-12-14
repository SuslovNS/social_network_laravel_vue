<template>
    <div class="w-96 mx-auto">
        <div>
            <input v-model="title" class="w-96 mb-3 rounded-3xl border p-2 border-slate-400 " type="text"
                   placeholder="title">
        </div>
        <div>
            <textarea v-model="content" class="w-96 mb-3 rounded-3xl border p-2 border-slate-400 "
                      placeholder="content"></textarea>
        </div>
        <div class="flex mb-3 items-center">
            <div>
                <input @change="storeImage" ref="file" type="file" class="hidden">
                <a href="#" class="block p-2 w-26 text-sm text-center rounded-3xl bg-sky-500 text-white"
                   @click.prevent="selectFile()">Add image</a>
            </div>
            <div  v-if="image">
                <a href="#" @click.prevent="image = null" class="ml-3">Cancel</a>
            </div>
        </div>
        <div v-if="image" >
            <img :src="image.url" alt="preview">
        </div>
        <div>
            <a @click.prevent="store" href="#" class="block p-2 w-32 text-center rounded-3xl bg-green-600 text-white
            hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ml-auto">Publish</a>
        </div>
    </div>
</template>

<script>


    export default {
        name: "Personal",

       data() {
            return {
                title: '',
                content: '',
                image: ''
            }
       },

        methods: {
            store(){
                const id = this.image ? this.image.id : null
                axios.post('/api/posts', {title: this.title, content: this.content, image_id: id})
                .then(res => {
                    this.title = ''
                    this.content = ''
                    this.image = null
                    console.log(res)
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
