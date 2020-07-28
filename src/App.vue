<template>
  <div id="app">

    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="name">
    <button v-on:click="peopleList.push(name)">Add</button>
    <ul class="peopleList">
      <li v-for="(name, index) in peopleList" :key="index" class="row">
        <span class="col">{{ name }}   </span> 
        <button v-on:click="removePerson(index)" class="col col-lg-2">Remove</button>
      </li>
    </ul>
    <dir id="wrapper">
      <ul class="circle"
        :class="{freeze: freeze}"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <li class="list" v-for="(person, index) in peopleList" :key="index"
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
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return{
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      peopleList: ['Kuba', 'Blazej', 'Patryk', 'Marcin', 'Rafał', 'Martin', 'Andrzej', 'Krzysztof', 'Sebestain', 'Anna', 'Konrad', 'Daniela', 'Vladyslav', 'Artur']
    }
  },
  components: {
  },
  methods: {
    removePerson: function (index) {
      this.peopleList.splice(index, 1)
    },
    setStyle: function (index) {
      const step = 360 / this.peopleList.length
      return `transform: rotate(${step * index -15}deg) skewY(-60deg)`
    },
    generateStyle: function () {
      let color = "" 

      while ( color.length < 6 ) {
        color += (Math.round(Math.random() * 15)).toString(16) 
      }
      let style = "background: #" + color
      style += ";transform: skewY(60deg) rotate(15deg)"
      return style
    },
    onClickRotate() {
      if (this.rolling) {
        return;
      }
      else if ( peopleList.length == 0) {
        alert("Koniec osób");
        return;
      }
      const result = Math.floor(Math.random() * this.peopleList.length);
      this.roll(result);
    },
    roll(result) {
      this.rolling = true;
      const { wheelDeg, peopleList } = this;
      this.wheelDeg =
        wheelDeg -
        (wheelDeg % 360) +
        (6 * 360) +
        (360 - 360 / peopleList.length * result);
      setTimeout(() => {
        this.rolling = false;
        alert("Mówi: " + peopleList[result]);
        peopleList.splice(result, 1);
        this.$forceUpdate();
      }, 4500);
    }
  },
  watch: {
    peopleNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    }
  }
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
