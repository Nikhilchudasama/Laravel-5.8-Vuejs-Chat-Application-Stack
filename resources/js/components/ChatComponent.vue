<template>
    <div class="container">
        <div class="jumbotron">
            <h1>Laravel 5.8 & Vuejs Chat Application</h1>
        </div>

        <div class="col-md-12">
            <div class="card">
                <div class="notification">

                </div>
                <div class="card-header">
                    Chat
                    <div class="float-right" v-if= "name">
                        <strong>Username:</strong> {{ name }}
                    </div>
                </div>
                <div v-if= "isShow" class="card-body">
                    <form class="form" @submit.prevent="addUsername">
                        <div class="row">
                            <div class="col-md-12">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="username">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit">Create</button>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <div class="card-body">
                        <div class="list-messages" v-if='messages && messages.length'>
                            <div class="media" v-for='message in messages' :key='message.id'>
                                <div class="media-body">
                                    <p v-if="name == message.name" class="text-right"><span style="color:red;"><strong>{{message.name}}</strong> :</span>{{message.body}}</p>
                                    <p v-else class="text-left"><span style="color:red;"><strong>{{message.name}}</strong> :</span>{{message.body}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="messages-not-found" v-else>Messages not found</div>
                    </div>
                    <div class="card-footer">
                        <div style="display:flex;" class="form-group">
                            <input type="text" class="form-control" placeholder="type your chat" v-model='message' @keyup.enter='sendMesaage'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                isShow: true,
                message: '',
                messages:[],
                name:'',
                username:'',
            }
        },
        sockets:{
            connect(){
            },
            newMessage(data){
                this.messages.push(data);
            },
            userLeft(data){
                document.querySelector('.notification').innerHTML = "<div class='alert alert-info'>" + data.body + "</div>";
            }
        },
        methods: {
            startInterval: function () {
                    setInterval(() => {
                        document.querySelector('.notification').innerHTML = ''
                    }, 3000);
            },
            addUsername(){
                this.isShow = false;
                this.name = this.username;
                this.$socket.emit('change_username', {username : this.username });
            },
            sendMesaage(){
                this.$socket.emit('newMessage', {
                    name: this.name,
                    body: this.message
                });
                axios.post('/sendMessage',{name:this.name,body:this.message})
                .then(response=>{
                });
                this.message='';
            },
            getMessage(){
                axios.get('/messages')
                .then(response=>{
                    this.messages = response.data;
                });
            },
        },
        mounted() {
            this.startInterval();
            this.getMessage();
        }
    }
</script>