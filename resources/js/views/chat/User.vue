<template>
    <div class="chat">
        <div class="empty-chat">
            <h3>Chat with {{userGet.name}}</h3>
        </div>
        <div class="chat-body">
            <div v-if="messages.length > 0">
                <div class="chat-messages">
                    <div v-for="message in messages" class="chat-message">
                        <div
                            :class="['chat-message-user', (message.sent_id === user.id) ? 'text-right' :  'text-left']">
                            {{message.sent_id === user.id ? user.name : userGet.name}}
                        </div>
                        <div
                            :class="['chat-message-text', (message.sent_id === user.id) ? 'text-right' :  'text-left']">
                            {{ message.body }}
                            <div v-if="message.image_url"
                                 :class="[(message.sent_id === user.id) ? 'chat-message-image-left' :  'chat-message-image-right']">
                                <img
                                    class="my-3 mx-auto" :src="message.image_url" :alt="'miss'">
                            </div>
                        </div>

                        <div
                            :class="['chat-message-timestamp', (message.sent_id === user.id) ? 'text-right' :  'text-left']">
                            {{message.time}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="empty-chat">
                No messages
            </div>
        </div>
        <div class="chat-footer">
            <div v-if="image">
                <a href="#" @click.prevent="image = null" class="ml-3">Delete photo</a>
            </div>
                <img type="image" v-if="image" :src="image.url" alt="preview">
            <form @submit.prevent="sendMessage">
                <input type="text" v-model="messageInput" placeholder="Введите сообщение">
                <input @change="storeImage" ref="file" type="file" class="hidden">
                <svg @click.prevent="selectFile()" type="add" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     :class="['ml-2 mt-1 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6', 'fill-white' ]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <button type="submit">Отправить</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User.vue",

        data() {
            return {
                user: {},
                userGet: {},
                messages: [],
                image: null,
                messageInput: '',
                userId: this.$route.params.userId,
                userSentId: '',
                channelId: ''
            }
        },


        methods: {

            sendMessage() {
                const id = this.image ? this.image.id : null
                axios.post(`/api/chat/${this.userId}/send`, {
                    message: this.messageInput,
                    sendUserId: this.user.id,
                    image_id: id
                })
                    .then(response => {
                        this.messageInput = ''
                        this.image = null
                        this.messages.push(response.data.data)
                    });
            },

            selectFile() {
                this.fileInput = this.$refs.file;
                this.fileInput.click();
            },

            storeImage(e) {
                let file = e.target.files[0]
                const formData = new FormData()
                formData.append('image', file)
                axios.post('/api/images_message', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        this.image = res.data.data
                    })
            },

            getMessages() {
                axios.get(`/api/chat/${this.userId}`)
                    .then(response => {
                        this.messages = response.data.data;
                        this.user = this.$route.meta.user;
                    });
            },

            getUserGet() {
                axios.get(`/api/users/get/${this.userId}`)
                    .then(response => {
                        this.userGet = response.data.data;
                    });
            },

            getChannelId(user1Id, user2Id) {
                return user1Id < user2Id ? `${user1Id}-${user2Id}` : `${user2Id}-${user1Id}`;
            },

            async openChannel() {
                const res = await axios.get('/api/user')
                let num = res.data.id
                this.userSentId = num.toString()
                this.channelId = this.getChannelId(this.userId, this.userSentId);
            },

            open() {
                if (!this.channelId) {
                    return setTimeout(this.open, 100);
                }
                window.Echo.channel(`chat.${this.channelId}`)
                    .listen('.store_message', res => {
                        this.messages.push(res.message)
                    })
            },


        },
        mounted() {
            this.getUserGet()
            this.getMessages()
            this.openChannel()
            this.open()
        },
    }


</script>

<style scoped>
    .chat {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .chat-header {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: center;
    }

    .chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    }

    .chat-messages {
        display: flex;
        flex-direction: column;
    }

    .chat-message {
        margin-bottom: 10px;
    }

    .chat-message-timestamp {
        font-size: 12px;
        margin-top: 5px;
    }

    .chat-message-user {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .chat-message-text {
        background-color: #f2f2f2;
        border-radius: 5px;
        padding: 5px;
    }

    .chat-message-image-right {
        max-width: 40%;
        height: auto;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        margin-right: auto;
    }

    .chat-message-image-left {
        max-width: 40%;
        height: auto;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        margin-left: auto;
    }

    .chat-footer {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: center;
    }

    .empty-chat {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #666;
    }

    .chat-footer form {
        display: flex;
        justify-content: center;
    }

    .chat-footer input[type="text"] {
        border: none;
        border-radius: 5px;
        padding: 5px;
        width: 80%;
    }

    .chat-footer button[type="submit"] {
        background-color: #4CAF50;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        margin-left: 10px;
        padding: 5px 10px;
    }

    .chat-footer button[type="submit"]:hover {
        background-color: #3e8e41;
    }


    .chat-footer img[type="image"] {
        max-width: 40%;
        height: auto;
        border-radius: 5px;
        margin: 0 auto;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
</style>
