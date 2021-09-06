<template>
  <div id="login" class="container-fluid" align="center">
      <div id="loginForm" v-if="!connected">

        <div class="container">
            <span >Room key: <input type="text" name="roomKey" id="roomKey" v-model="roomKey"></span><br />
            <button v-on:click="joinRoom()">Enter room</button>
      </div>
      </div>
        <div id="wheel" v-if="connected">
            <wheel :roomKey="roomKey" :socket="socket" :remaining="remaining"></wheel>
        </div>
  </div>
</template>


<script>

import wheel from './wheel';

export default {
  components: {
    wheel,
  },
  data() {
    return{
      // url: "dejli-losowanko-backend.herokuapp.com",127.0.0.1:8000
      url: "127.0.0.1:8000",
      roomKey: '',
      socket: null,
      connected: false,
      remaining: []
    }
  },
  created() {
    var roomKey = new URL(location.href).searchParams.get('room')
    console.log(this.$router)
    if(roomKey != null) {
      this.roomKey = roomKey
      this.joinRoom()
    }

    var self = this
    this.socket.onmessage = function(event) {
      var data = JSON.parse(event.data)
      self.remaining = data.remaining
    }
  },
  methods: {
    joinRoom: function () {
      var self = this
      if(this.roomKey.length == 0) {
          alert("Name or key empty")
      }
      else{
        this.socket = new WebSocket('ws://'+ this.url +'/ws/' + this.roomKey)
        this.socket.onopen = function() {
          self.connected = true
        }
        var roomKey = new URL(location.href).searchParams.get('room')
        if(roomKey === null){
          const url = new URL(location.href);
          url.searchParams.set('room', self.roomKey);
          history.pushState(null, '', url);
        }
      }
    },
  },
}
</script>

<style>
    .login {
        background: #a3a3a3;
        height: 100%;
        width: 50%;
        margin: 0 auto;
    }
</style>
