<template>
  <div id="wheel">
    <span v-if="roomKey.length">Key: {{ roomKey }}</span><br />
    <span>Name: <input type="text" name="name" id="name" v-model="name"><button v-on:click="joinRoom()">Join</button></span><br />
    <span>Mówi: {{ nowSpeeking }}</span>
    <b-container>
      <b-row>
        <b-col cols="8">
          <dir id="wrapper">
            <ul class="circle"
              :class="{freeze: freeze}"
              :style="`transform: rotate(${wheelDeg}deg)`"
            >
              <li class="list" v-for="(person, index) in remaining" :key="index"
                :style="setStyle(index)"
              >
                <div class="text"
                  :style="generateStyle()"
                >
                {{ person }}</div>
              </li>
            </ul>
            <div
              class="wheel-pointer"
              @click="onClickRotate('text')"
            >
              Start
            </div>
          </dir>
        </b-col>

        <b-col cols="4">
          <b-list-group>
            <b-list-group-item v-for="(person, index) in remaining" :key="index">
              {{ person }} <b-button variant="danger" v-on:click="removePerson(person)">Remove</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>


<script>
export default {
  name: 'wheel',
  props: {
    roomKey: String,
    socket: null,
    remaining: Array
  },
  data() {
    return{
      freeze: false,
      rolling: false,
      name: "",
      wheelDeg: 0,
      nowSpeeking: '',
      result: null
    }
  },
  created() {
    var self = this
    this.socket.onmessage = function(event) {
      var data = JSON.parse(event.data)
      self.remaining = data.remaining
      if (data.picked != null) {
        if ( data.remaining.length == 0) {
          alert("Koniec osób");
          return;
        }
        self.roll(data.picked)
      }
    }
  },
  methods: {
    joinRoom: function () {
      this.socket.send(JSON.stringify({
        "message": "join_room",
        "name": this.name
      }))
    },
    setStyle: function (index) {
      const step = 360 / this.remaining.length
      return `transform: rotate(${step * index -15}deg) skewY(-60deg)`
    },
    generateStyle: function () {
      let color = "" 

      while ( color.length < 6 ) {
        color += (Math.round(Math.random() * 15)).toString(16) 
      }
      let style = "background: #fff"
      style += ";transform: skewY(60deg) rotate(15deg)"
      return style
    },
    onClickRotate() {
      if (this.rolling) {
        return;
      }
      this.socket.send(JSON.stringify({
        "message": "spin"
      }))
    },
    roll(result) {
      var self = this
      this.rolling = true;
      const { wheelDeg, remaining } = this;
      this.wheelDeg =
        wheelDeg -
        (wheelDeg % 360) +
        (6 * 360) +
        (360 - 360 / remaining.length * result);
      setTimeout(() => {
        self.rolling = false;
        self.result = result;
        self.nowSpeeking = remaining[result];
        self.$forceUpdate();
      }, 4500);
    },
    removePerson(person) {
      this.socket.send(JSON.stringify({
        "message": "remove_person",
        "name": person
      }))
    }
  },
}
</script>

<style lang='scss'>
  #wrapper {
    position: relative;
    padding: 0;
    margin: 0 auto;

    width: 40em;
    height: 40em;
  }
  .row {
    list-style-type: none;
  }
  .circle {
    position: relative;
    border: 1px solid black;
    padding: 0;
    margin: 1em auto;
    width: 40em;
    height: 40em;
    border-radius: 50%;
    list-style: none;
    overflow: hidden;
  }
  .list {
    overflow: hidden;
    position: absolute;
    top: 0; 
    right: 0;
    width: 50%; 
    height: 50%;
    transform-origin: 0% 100%;      
  }
  
  .circle {
    width: 100%;
    height: 100%;
    border-radius: 1000px;
    overflow: hidden;
    transition: transform 4s ease-in-out;
    background: #7eef97;

    &.freeze {
      transition: none;
      background: red;
    }
  }

  .text {
    position: absolute;
    left: -100%;
    width: 200%; height: 200%;
    text-align: center;
    padding-top: 20px;
  }

  .wheel-pointer {
    width: 60px;
    height: 60px;
    border-radius: 1000px;
    background: yellow;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 60px;
    z-index: 10;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: -32px;
      left: 50%;
      border-width: 0 8px 40px;
      border-style: solid;
      border-color: transparent transparent yellow;
      transform: translateX(-50%);
    }
  }

</style>
