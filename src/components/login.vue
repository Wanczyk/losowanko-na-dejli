<template>
  <div id="login" class="container-fluid" align="center">
      <div id="loginForm" v-if="!responseGood">

        <div class="row">
        <span>Name: <input type="text" name="name" id="name" v-model="name"></span><br />
        <span>Login? <input type="checkbox" id="checkbox" v-model="loggin"></span><br />
        <span v-if="loggin">Room key: <input type="text" name="roomKey" id="roomKey" v-model="roomKey"></span><br />
        <button v-on:click="joinRoom()" v-text="loggin == true ? 'Login' : 'Create room'"></button>
      </div>
      </div>
        <div id="wheel" v-if="responseGood">
            <wheel :peopleList="peopleList" :roomKey="roomKey" :name="name"></wheel>
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
      loggin: true,
      name: '',
      roomKey: '',
      peopleList: [],
      responseGood: false,
    }
  },
  methods: {
    joinRoom: function () {
      if(this.name.length == 0) {
          alert("Name empty")
      }
      else if(this.loggin && this.roomKey.length == 0) {
          alert("Key empty")
      }
      else{
          if(this.loggin){
              this.$http
                .post('https://dejli-losowanko-backend.herokuapp.com/join', {
                        name: this.name,
                        key: this.roomKey
                    }
                )
                .then(response => {
                    console.log(response.data.msg.people)
                    if(response.status == 200){
                        this.peopleList = response.data.msg.people
                        this.responseGood = true
                    }
                });
            
            console.log(this.peopleList);
          }
          else {
            this.$http
                .post('https://dejli-losowanko-backend.herokuapp.com/create', {
                        name: this.name
                    }
                )
                .then(response => {
                    console.log(response.data.msg.people)
                    if(response.status == 200){
                        this.peopleList = response.data.msg.people
                        this.roomKey = response.data.msg._key
                        this.responseGood = true
                    }
                });
          }
      }
    },
  }
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
