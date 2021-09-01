<template>
  <div id="login" class="container-fluid" align="center">
      <div id="loginForm" v-if="!socket">

        <div class="container">
            <span >Room key: <input type="text" name="roomKey" id="roomKey" v-model="roomKey"></span><br />
            <button v-on:click="joinRoom()">Enter room</button>
      </div>
      </div>
        <div id="wheel" v-if="socket">
            <wheel :roomKey="roomKey" :socket="socket" :url="url"></wheel>
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
      url: "81t8hx.deta.dev/",
      roomKey: '',
      socket: null
    }
  },
  created() {
    this.roomKey = window.location.href.split('/')[3]
    console.log(this.roomKey)
    if(this.roomKey != "") {
      this.joinRoom()
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  methods: {
    joinRoom: function () {
      if(this.roomKey.length == 0) {
          alert("Name or key empty")
      }
      else{
        this.socket = new WebSocket('wss://'+ this.url +'/ws/' + this.roomKey)
      }
    }
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
