<template>
  <div class="video">
    <div class="container">
      <video ref="video"></video>
    </div>
    <div class="controls">

      <div class="top">
        <div class="screen">
          <div class="full_screen">
          </div>
          <div class="picture_in_picture">
          </div>
        </div>
        <div class="volume">
          <div class="volume_icon">
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="play_btn" @click="playClick">
          {{ onPause ? 'Pause' : 'Play' }}
        </div>
      </div>
      <div class="bottom">
        <div class="progress"></div>
        <div class="retractable">
          <div class="left">
            <div class="prev_video"></div>
            <div class="next_video"></div>
          </div>
          <div class="right">
            <div class="icon"></div>
            <div class="settings">
              <div class="menu">
                <div class="graphics">1</div>
                <div class="speed">2</div>
              </div>
            </div>

            <div class="up_arrow">

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>


</template>


<style scoped lang="scss" src="./style.scss"></style>

<script lang="ts">
import {Action, Component, Getter, State, Vue, Watch,} from 'nuxt-property-decorator';
import {LoadableVideo, VideosState} from "~/store/type";

@Component
export default class CVideo extends Vue {
  private videoElement: HTMLVideoElement | null = null;
  @Getter("videos/list") private videos!: LoadableVideo[];
  @Action("videos/fetchVideos") private fetchVideos!: Function;
  private onPause: boolean = true;

  public async fetch() {
    await this.fetchVideos();
  }

  private nowVideo: LoadableVideo | null = null;

  private setNowVideo(video: LoadableVideo | null) {
    if (video) {
      this.nowVideo = video;
      this.videoElement!.src = "videos/" + video.src;
      this.videoElement!.poster = "videos/" + video.poster;
      this.videoElement!.load();
    }
  }

  @Watch("onPause")
  private onPauseChange() {
    if (this.onPause)
      this.videoElement!.pause();
    else
      this.videoElement!.play();

  }

  private mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement;
    this.setNowVideo(this.videos[0]);

  }

  public playClick() {
    this.onPause = !this.onPause;
  }

}

</script>
