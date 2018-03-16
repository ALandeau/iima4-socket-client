<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                isConnected: false,
            }
        },

        sockets: {
            connect: function () {
                this.isConnected = true;
                $('#alert-status').html(`<p class="green_status"></p><p>Connected</p>`).css("background-color", "$green");
            },

            disconnect() {
                this.isConnected = false;
                $('#alert-status').html(`<p class="red_status"></p><p>Disconnected</p>`).css("background-color", "$red");
            },
        }
    }
</script>

<style lang="scss">
@import "assets/scss/index";
#app {
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 1fr;
}
</style>
