<template>
  <div class="video">
    <div class="container">
      <video ref="video"></video>
    </div>
    <div class="controls">
      <div class="bottom">
        <div class="_progress"></div>
        <div class="_retractable"></div>
      </div>
    </div>
    {{ videos }}
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
import {Action, Component, Getter, State, Vue, Watch,} from 'nuxt-property-decorator';
import {VideosState} from "~/store/type";
import db from '~/plugins/firebase';
import {collection, onSnapshot, Unsubscribe} from "firebase/firestore";

@Component
export default class CVideo extends Vue {
  private videoElement: HTMLVideoElement | null = null;
  @Getter("videos/list") private videos!: VideosState;
  @Action("videos/fetchVideos") private fetchVideos!: Function;
  private unsubscribe!: Unsubscribe;
  public async fetch() {
    await this.fetchVideos();
  }
  private mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement;
    const col = collection(db, "videos");
    this.unsubscribe = onSnapshot(col, async (querySnapshot) => {
      await this.fetchVideos();
    });

  }
  private beforeDestroy() {
    this.unsubscribe();
  }

}

</script>
