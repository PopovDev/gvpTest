import {Component, Prop, Vue, Watch} from 'nuxt-property-decorator';
import ProgressBar from "~/components/CVideo/ProgressBar.vue";
import Volume from "~/components/CVideo/Volume.vue";

@Component({components: {Volume, ProgressBar}, name: 'CVideo'})
export default class CVideo extends Vue {
  @Prop({required: true, type: Object})
  public video!: IVideo;

  public posterSrc: string = "";
  private posterLoaded: boolean = false;

  private videoElement: HTMLVideoElement | null = null;
  private paused: boolean = true;
  private progressChanging: boolean = false;
  private totalTime: number = 0;
  private videoProgress: number = 0;
  private volume: number = 0;
  private loadedFrags: TimeRanges | null = null;

  private onProgressChange(progress: number) {
    if (!this.videoElement) return;
    this.videoProgress = progress;
    this.videoElement.currentTime = progress / 100 * this.videoElement.duration;
  }

  private progressChangingEmitted(e: boolean) {
    this.progressChanging = e;
  }

  @Watch("paused")
  private async onPauseChange() {
    if (this.paused)
      this.videoElement!.pause();
    else
      await this.videoElement!.play();
  }

  private timeUpdate() {
    if (!this.videoElement) return;
    this.videoProgress = (this.videoElement.currentTime / this.videoElement.duration || 0) * 100;
    this.loadedFrags = this.videoElement.buffered;
    this.totalTime = this.videoElement.duration;
    if (isNaN(this.totalTime)) this.totalTime = 0;
  }

  private async fullScreenClick() {
    const videoMain = this.$refs.videoMain as any;
    if (!videoMain) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await videoMain.requestFullscreen();
    }
  }

  private async picInPicClick() {
    if (!this.videoElement) return;
    const aDoc = document as any;
    const aVideo = this.videoElement as any;
    if (aDoc.pictureInPictureElement) {
      await aDoc.exitPictureInPicture();
    } else if (aVideo.requestPictureInPicture) {
      await aVideo.requestPictureInPicture();
    }
  }

  public playClick() {
    this.paused = !this.paused;
  }

  private loadVideo() {
    if (!this.videoElement) return;
    const url = `/video/${this.video.file}`;
    this.videoElement.src = url
    this.posterSrc = `${url}?poster=1`;
    this.videoElement.load();
  }

  private async keyDown(e: KeyboardEvent) {
    switch (e.code) {
      case "Space":
        this.playClick();
        break;
      case "ArrowLeft":
        this.onProgressChange(this.videoProgress - 5);
        break;
      case "ArrowRight":
        this.onProgressChange(this.videoProgress + 5);
        break;
      case "KeyF":
        await this.fullScreenClick();
        break;
      case "KeyP":
        await this.picInPicClick();
        break;
    }

  }

  private setVolume(e: number) {
    if (!this.videoElement) return;

    this.volume = Math.min(Math.max(e, 0), 100);

    sessionStorage.setItem("volume", this.volume.toString());

    this.videoElement.volume =  this.volume / 100;
  }

  private initVideoElement() {
    this.videoElement = this.$refs.video as HTMLVideoElement;
    this.videoElement.ontimeupdate = this.timeUpdate;
    this.videoElement.onpause = () => this.paused = true;
    this.videoElement.onplay = () => this.paused = false;
    document.addEventListener("keydown", this.keyDown);
  }

  private loadVolume() {
    const volume = sessionStorage.getItem("volume");
    this.setVolume(volume ? parseInt(volume) : 100);
  }

  public mounted() {
    this.initVideoElement();
    this.loadVideo();
    this.loadVolume();
  }

  public beforeDestroy() {
    document.removeEventListener("keydown", this.keyDown);
  }

}
