<template>
  <div class="video" draggable="false">
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
      <div class="middle" @click="playClick">
        <div class="play_btn">
          {{ !paused ? 'Pause' : 'Play' }}
        </div>
      </div>
      <div class="bottom">
        <ProgressBar :progress="videoProgress" @progressChange="onProgressChange" class="progress"/>
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
import {Action, Component, Getter, Vue, Watch} from 'nuxt-property-decorator';
import {LoadableVideo} from "~/store/type";
import ProgressBar from "~/components/CVideo/ProgressBar.vue";

@Component({components: {ProgressBar}, name: 'CVideo'})
export default class CVideo extends Vue {
  private videoElement: HTMLVideoElement | null = null;
  @Getter("videos/list") private videos!: LoadableVideo[];
  @Action("videos/fetchVideos") private fetchVideos!: Function;
  private paused: boolean = true;
  private nowVideo: LoadableVideo | null = null;

  public async fetch() {
    await this.fetchVideos();
  }

  private videoProgress: number = 0;

  private onProgressChange(progress: number) {
    if (!this.videoElement) return;
    this.videoProgress = progress;
    this.videoElement.currentTime = progress / 100 * this.videoElement.duration;
  }

  private setNowVideo(video: LoadableVideo | null) {
    if (video) {
      this.nowVideo = video;
      this.videoElement!.src = "videos/" + video.src;
      this.videoElement!.poster = "videos/" + video.poster;
      this.videoElement!.load();
    }
  }

  @Watch("paused")
  private onPauseChange() {
    if (this.paused)
      this.videoElement!.pause();
    else
      this.videoElement!.play();
  }

  private timeUpdate() {
    if (!this.videoElement) return;
    this.videoProgress = (this.videoElement.currentTime / this.videoElement.duration || 0) * 100;
  }

  private mounted() {
    this.videoElement = this.$refs.video as HTMLVideoElement;
    this.videoElement.ontimeupdate = this.timeUpdate;
    this.videoElement.onpause = () => this.paused = true;
    this.videoElement.onplay = () => this.paused = false;
    this.setNowVideo(this.videos[0]);
    console.log("mounted");
  }

  public playClick() {
    this.paused = !this.paused;
  }

}

</script>
