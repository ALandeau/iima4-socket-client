<template>
    <div id="chat">
        <div id="current_room">
            <div v-if="current_room">
                {{current_room}}
            </div>
        </div>
        <div id="users">
            <p class="title_part">Utilisateurs connectés</p>
            <p v-for="user in users">
                {{user}}
            </p>
        </div>
        <div id="message">
            <div class="wrapper_message">
                <div class="content_message">
                    <div v-for="message in messages">
                        <div class="right_message" v-if="message.username">
                            <p class="username_message">{{message.username}}</p>
                            <p>{{message.message}}</p>
                        </div>
                        <div class="center_message" v-else-if="message.userdeco">
                            <p>{{message.userdeco}} s'est déconnecté !</p>
                        </div>
                        <div class="left_message" v-else>
                            <p>{{message}}</p>
                        </div>
                    </div>
                </div>
                <div class="write_message">
                    <p id="typing"></p>
                    <form v-on:submit.prevent="message(contentMsg)">
                        <div class="content_input">
                            <input v-model="contentMsg" v-on:click="focus" id="msgBox" name="contentMsg" placeholder="Écrivez votre message ici... ">
                            <input id="testSend" type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chat",
        data: function () {
            return {
                contentMsg: '',
                messages : [],
                users: [],
                current_room: null
            }
        },
        sockets:{
            message: function(json) {
               this.messages.push(json);
            },
            personnal_message: function(json) {
                this.messages.push(json);
            },
            get_messages : function (json) {
                this.messages.push(json);
            },
            get_personnal_messages: function(json){
                this.messages.push(json);
            },
            get_users : function (json){
                this.users.push(json.username);
            },
            get_disconnect: function (json){
                this.messages.push(json);
            },
            join: function (json) {
                var data = JSON.parse(json);
                var username = localStorage.getItem("username");
                if(username !== data.username || data.username === 'undefined'){
                    this.$router.push({name: 'login'});
                }
            },
            disconnect: function(){
                this.$router.push({name: 'login'});
            },
            room: function(data){
                this.current_room = data;
            },
            typing: function(user){
                var typing = $('#typing');
                typing.html(`${user} is typing... `);
                setTimeout(function () {
                    typing.html('');
                }, 2000);
            }
        },
        methods: {
            message(content) {
                this.$socket.emit('message', content);
                console.log(`Message: "${content}" send !`);
                this.contentMsg = "";
            },
            focus: function() {
                this.$socket.emit('typing');
            }
        }
    };
</script>

<style lang="scss">
    @import "../assets/scss/index";
    #chat {
        display: grid;
        grid-template-areas:
                "room room"
                "users message";
        grid-template-rows: 80px 1fr;
        grid-template-columns: 250px 1fr;
        #current_room, #users {
            @extend %flexbox;
        }
        #current_room {
            grid-area: room;
            background-color: $cBlack;
            @include align-items(center);
            @include justify-content(center);
            color: $cWhite1;
            font:{weight: 600; size: 1.2em}
            text:{transform: uppercase}
        }
        #users {
            grid-area: users;
            @include flex-flow(column nowrap);
            background-color: $cWhite2;
            .title_part{
                background-color: $cWhite1;
                padding: 20px 0;
                margin: 0 0 10px;
            } p{padding: 10px 0;}
        }
        #message {
            grid-area: message;
            .wrapper_message{
                display: grid; height: 100%;
                grid-template-areas: "content" "write";
                grid-template-rows: 1fr 80px;
                grid-template-columns: 1fr;
                .content_message, .write_message{
                    @extend %flexbox;
                    @include flex-flow(column nowrap);
                }
                .content_message {
                    grid-area: content;
                    max-height: 100%;
                    overflow-y: scroll;
                    > div{
                        padding: 10px 40px;
                        @extend %flexbox;
                        @include flex-flow(column nowrap);
                    }
                    .left_message, .right_message{
                        padding: 10px 40px;
                        border-radius: 10px;
                        .username_message{font:{weight: 600}}
                    } .left_message{
                        @include align-self(flex-start);
                        background-color: $cGreen;
                    } .right_message{
                        @include align-self(flex-end);
                        background-color: $cWhite2;
                    } .center_message{
                        padding: 10px 50px;
                        border-radius: 10px;
                        background-color: $cWhite1;
                    }
                }
                .write_message{
                    grid-area: write;
                    @include justify-content(center);
                    #typing{min-height: 20px;}
                    form{
                        height: 100%;
                        .content_input{
                            height: 100%;
                            @extend %flexbox;
                            @include flex-flow(row nowrap);
                            input{
                                &[name=contentMsg]{
                                    width: 80%;
                                    padding: 5px 25px;
                                    font:{weight:600; size: 1em}
                                    color: $cBlack;
                                    border:{color: $cGreen; style: solid; width: 3px}
                                };
                                &[type=submit]{
                                    width: 20%;
                                    background-color: $cBlack;
                                    color: $cGreen;
                                    font:{weight: 600; size: 0.8em;}
                                    text:{transform: uppercase}
                                    cursor: pointer;
                                };
                            }
                        }
                    }
                }
            }
        }

        @include break-point(mobile){
            grid-template-areas:
                    "room"
                    "message";
            grid-template-rows: 80px 1fr;
            grid-template-columns: 1fr;
            #users{
                display: none;
            }
        }
    }
</style>