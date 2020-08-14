<template>
  <div id="login" class="container">
      <div id="loginForm" v-if="!responseGood">
          <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" name="name" id="name" v-model="name" class="form-control" aria-describedby="name">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="loggin">
                <label class="form-check-label">Login?</label>
            </div>
            <div class="form-group">
                <span v-if="loggin">Room key: <input type="text" class="form-control" name="roomKey" id="roomKey" v-model="roomKey"></span>
            </div>
            <button v-on:click="joinRoom()" class="btn btn-primary" v-text="loggin == true ? 'Login' : 'Create room'"></button>
          </form>
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
        console.log(this.name, this.loggin)
      if(this.name.length == 0) {
          alert("Name empty")
      }
      else if(this.loggin && this.roomKey.length == 0) {
          alert("Key empty")
      }
      else{
          console.log(this.key)
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
          console.log(this.name)
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
