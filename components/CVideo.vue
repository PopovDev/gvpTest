<template>
  <div class="video">
    <div class="container">
      <video ref="video"></video>
    </div>
    <div class="controls">
      <div class="bottom">
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
  > .container {
    @include flexbox-layout;
    width: 100%;
    height: 100%;
    z-index: 0;

    > video {
      width: 100%;
      height: 100%;
    }
  }

  > .controls {
    z-index: 1;
    @include flexbox-layout;
    background: green;
    width: 100%;
    height: 100%;

    > .bottom {
      position: absolute;
      transition: height 0.5s;
      bottom: 0;
      width: 100%;
      height: 5%;
      @include flexbox-layout;
      justify-content: flex-start;

      > ._progress {
        width: 100%;
        flex-basis: 20%;
        background: #ff0000;
      }
      > ._retractable {
        width: 100%;
        flex-basis: 80%;
      }
      &:hover {
        height: 10%;
      }
    }
  }
}

</style>

<script lang="ts">
import Vue from 'vue'

declare interface LoadableVideo {
  src: string;
  poster: string;
  name: string;
}

declare interface VideoData {
  videoElement: HTMLVideoElement | null;
  video: LoadableVideo | null;
}

export default Vue.extend({
  name: 'CVideo',
  data(): VideoData {
    return {
      videoElement: null,
      video: null
    }
  },
  methods: {
    loadVideo(video: LoadableVideo): void {
      if (this.videoElement) {
        this.video = video;
        this.videoElement.src = video.src;
        this.videoElement.poster = video.poster;
        this.videoElement.load();
      }
    }
  },
  mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement;
    const video: LoadableVideo = {
      src: 'videos/1.mp4',
      poster: 'videos/1.jpg',
      name: 'Video 1'
    }
    this.loadVideo(video);

  }

});

</script>
