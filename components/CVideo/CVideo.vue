<template>
  <div class="video" ref="videoMain" draggable="false">
    <div class="container">
      <video ref="video"></video>
    </div>
    <div class="controls" :class="{show: paused||progressChanging}">
      <div class="top">
        <div class="screen">
          <div class="full_screen" @click="fullScreenClick">
          </div>
          <div class="picture_in_picture" @click="picInPicClick">
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
      <div class="bottom" :class="{open:progressChanging}">
        <div class="progress_bar">
          <ProgressBar :progress="videoProgress"
                       @holdChange="progressChangingEmitted"
                       @progressChange="onProgressChange"
                       :total-time="totalTime"
                       :loaded-frags="loadedFrags"
                       class="progress"/>

        </div>
        <div class="retractable">
          <div class="left">
            <div class="prev_video"></div>
            <div class="next_video"></div>
          </div>
          <div class="right">
            <div class="icon"></div>
            <div class="settings">
              <div class="menu">
                <div class="graphics">
                  <div class="graphics_icon">
                  </div>
                  <div class="graphic">
                    <div class="low">
                    </div>
                    <div class="lowHd">
                    </div>
                    <div class="hd">
                    </div>
                  </div>
                </div>

                <div class="speed">
                  <div class="speed_icon">
                  </div>
                  <div class="speeds">
                    <div class="slow">
                    </div>
                    <div class="normal">
                    </div>
                    <div class="fast">
                    </div>
                  </div>
                </div>

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
  private progressChanging: boolean = false;
  private totalTime: number = 0;
  private videoProgress: number = 0;
  private loadedFrags: TimeRanges | null = null;

  public async fetch() {
    await this.fetchVideos();
  }


  private onProgressChange(progress: number) {
    if (!this.videoElement) return;
    this.videoProgress = progress;
    this.videoElement.currentTime = progress / 100 * this.videoElement.duration;

  }

  private setNowVideo(video: LoadableVideo | null) {
    if (!this.videoElement) return;
    if (!video) return;
    this.nowVideo = video;
    this.videoElement.src = video.src;
    this.videoElement.poster = video.poster;
    this.videoElement.load();
  }

  @Watch("paused")
  private onPauseChange() {
    if (this.paused)
      this.videoElement!.pause();
    else
      this.videoElement!.play();
  }

  private progressChangingEmitted(e: boolean) {
    this.progressChanging = e;
  }

  private timeUpdate() {
    if (!this.videoElement) return;
    this.videoProgress = (this.videoElement.currentTime / this.videoElement.duration || 0) * 100;
    this.loadedFrags = this.videoElement.buffered;
    this.totalTime = this.videoElement.duration;
    if (isNaN(this.totalTime)) this.totalTime = 0;
  }

  private fullScreenClick() {
    const videoMain = this.$refs.videoMain as any;
    if (!videoMain) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoMain.requestFullscreen();
    }
  }

  private picInPicClick() {
    if (!this.videoElement) return;
    const aDoc = document as any;
    const aVideo = this.videoElement as any;
    if (aDoc.pictureInPictureElement) {
      aDoc.exitPictureInPicture();
    } else if (aVideo.requestPictureInPicture) {
      aVideo.requestPictureInPicture();
    }
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
