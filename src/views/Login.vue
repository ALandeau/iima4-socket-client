<template>
    <div id="login">
        <form v-on:submit.prevent="connect(username, room)">
            <div class="username_parent">
                <input required v-model="username" id="userBox" name="username" placeholder="Username">
            </div>
            <div class="room_parent">
                <input required v-model="room" id="roomBox" name="room" placeholder="Room">
            </div>
            <div class="send_parent">
                <input id="testSend" type="submit" value="Go !"/>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function () {
            return {
                username: '',
                room: ''
            }
        },
        sockets:{
            join: function() {
                console.log('Join OK');
            }
        },
        methods: {
            connect(username, room) {
                console.log(room);
                if(room !== null){
                    if (typeof(Storage) !== undefined) {
                        localStorage.setItem('username', username);
                    }
                    this.$socket.emit('join', username, room);
                    console.log(`User: "${username}" connected on ${room} !`);
                    this.$router.push({name: 'chat', params: { id_room: room }});
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/index";
    #login form{
        display: grid;
        height: 100%;
        grid-template-areas:
            "username room"
            "send send";
        grid-template-rows: 1fr 80px;

        .room_parent, .username_parent, .send_parent{
            @extend %flexbox;
            height: 100%; width: 100%;
            input{
                width: 100%; height: 100%;
                font: {family: 'Avenir', Helvetica, Arial, sans-serif; weight: 600; size: 1.6em;}
                color: $cBlack;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                padding: 0 20px;
            }
        } .username_parent, .room_parent {
            input{
                background-color: $cWhite2;
                transition: background-color ease-in-out 0.4s;
                &:focus{
                    background-color: $cGreen;
                    color: $cWhite1;
                }
            }
        } .username_parent{
            grid-area: username;
        } .room_parent{
            grid-area: room;
        }

        .send_parent{
            grid-area: send;
            input{
                background-color: $cBlack;
                color: $cWhite1;
                cursor: pointer;
            }
        }
    }
</style>