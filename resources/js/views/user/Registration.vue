<template>
    <div>
        <div class="w-96 mx-auto">

            <div>
                <input v-model="name" type="name" placeholder="name"
                       class="w-96 p-1 mb-2 border border-inherit rounded-lg">
            </div>
            <div>
                <input v-model="email" type="email" placeholder="email"
                       class="w-96 p-1 mb-2 border border-inherit rounded-lg">
            </div>
            <div>
                <input v-model="password" type="password" placeholder="password"
                       class="w-96 p-1 mb-2 border border-inherit rounded-lg">
            </div>
            <div>
                <input v-model="password_confirmation" type="password" placeholder="password_confirmation"
                       class="w-96 p-1 mb-2 border border-inherit rounded-lg">
            </div>
            <div v-if="errors">
                <p v-for="error in errors" class="text-sm mt-2 text-red-500">{{error}}</p>
            </div>
            <input @click.prevent="register" type="submit" value="register"
                   class="block float-right mx-auto w-32 p-1 bg-red-600 text-white rounded-lg">
        </div>
    </div>
</template>

<script>
export default {
    name: "Registration",

    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            errors: []
        }
    },

    methods: {
        register() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    })
                    .then( res => {
                        localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
                        this.$router.push({name: 'user.personal'})
                    })
                    .catch( e => {
                        this.errors = e.response.data.errors
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>
