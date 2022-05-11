<template>
  <div class="root">
    <video :src="src"></video>
    <div>
      <div class="btn">
          123
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.root {
  background: #0576a2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 100%;
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
