<template>


  <div class="video">
    <div class="container">
      <video :src="src"></video>
    </div>

    <div class="controls">
      <div class="bottom_controls">
        <div class="_progress">

        </div>
        <div class="_retractable">

        </div>
      </div>

    </div>
  </div>


</template>


<style scoped lang="scss">

@mixin flexbox-layout {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.video {
  background: #31a205;
  @include flexbox-layout;
  width: 100%;
  position: relative;
  height: 100%;
  .container {
    @include flexbox-layout;
    width: 100%;
    height: 100%;
    z-index: 0;
    video{
      width: 100%;
      height: 100%;
    }
  }
  .controls {

    z-index: 1;
    @include flexbox-layout;
    background: green;
    width: 100%;
    height: 100%;

    .bottom_controls {
      position: absolute;
      transition: height 0.5s;
      bottom: 0;
      width: 100%;
      height: 5%;
      pointer-events: none;
      @include flexbox-layout;
      justify-content: flex-start;
      ._progress {
        width: 100%;
        flex-basis: 20%;
        background: #ff0000;
      }
      ._retractable{
        width: 100%;
        flex-basis: 80%;
        pointer-events: all;
      }

    }
    .bottom_controls:hover {
      height: 10%;
    }
  }
}

</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CVideo',
  data() {
    return {
      src: '',
    }
  },
  methods: {},
  mounted() {
    this.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4";
  }

});

</script>
