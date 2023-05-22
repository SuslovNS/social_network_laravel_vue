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
                    <form @submit.prevent="sendMessage">
                        <input type="text" v-model="messageInput" placeholder="Введите сообщение">
                        <button type="submit">Отправить</button>
                    </form>
                </div>
    </div>
</template>

<script>
    export default {
        name: "User.vue",

        created() {
            window.Echo.channel('store_message')
            .listen('.store_message', res => {
                this.messages.push(res.message)
            })
        },

        data() {
            return {
                user: {},
                userGet: {},
                messages: [],
                messageInput: '',
                userId: this.$route.params.userId
            }
        },
        methods: {
            sendMessage() {
                axios.post(`/api/chat/${this.userId}/send`, {
                    message: this.messageInput,
                    sendUserId: this.user.id
                })
                    .then(response => {
                        this.messageInput = '';
                        this.messages.push(response.data.data)
                    });
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

        },
        mounted() {
            this.getUserGet()
            this.getMessages()
            // this.getUserSent()
            // Echo.private(`chat.${this.userId}`)
            //     .listen('MessageSent', (e) => {
            //         this.messages.push({
            //             message: e.message,
            //             user: e.user
            //         });
            //     });
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
</style>
