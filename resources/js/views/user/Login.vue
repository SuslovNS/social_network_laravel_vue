<template>
    <div class="w-96 mx-auto">
        <div>
            <input v-model="email" type="email" placeholder="email" class="w-96 p-1 mb-2 border border-inherit rounded-lg">
        </div>
        <div>
            <input v-model="password" type="password" placeholder="password" class="w-96 p-1 mb-2 border border-inherit rounded-lg">
        </div>
        <div v-if="errors">
            <p v-for="error in errors" class="text-sm mt-2 text-red-500">{{error}}</p>
        </div>
        <div>
            <input @click.prevent="login" type="submit" value="login" class="block float-right mx-auto w-32 p-1 bg-red-600 text-white rounded-lg">
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,
            errors: []
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/login', {email: this.email, password: this.password})
                        .then(r => {
                            localStorage.setItem('x_xsrf_token', r.config.headers['X-XSRF-TOKEN'])
                            this.$router.push({name: 'user.personal'})
                        })
                        .catch(e => {
                            this.errors = e.response.data.errors
                        })
                })
        }
    }
}
</script>

<style scoped>

</style>
