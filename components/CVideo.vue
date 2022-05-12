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
        <div class="play_btn">
        </div>
      </div>
      <div class="bottom">
        <div class="_progress">

        </div>
        <div class="_retractable">
          <div class="left">
            <div class="prev_video">

            </div>
            <div class="next_video">

            </div>
          </div>
          <div class="right">
            <div class="icon">

            </div>
            <div class="settings">
              <div class="menu">
                <div class="graphics">

                </div>
                <div class="speed">

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
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;

    > .top {
      position: absolute;
      z-index: 2;
      @include flexbox-layout;
      transition: opacity 0.5s;
      width: 100%;
      height: 10%;
      background: gray;
      opacity: 0;
      top: 0;
      &:hover {
        opacity: .4;
      }
    }

    > .middle {
      position: absolute;
      z-index: 3;
      opacity: 0;
      @include flexbox-layout;
      transition: opacity 0.5s;
      width: 100%;
      height: 80%;

      > .play_btn {
        width: 5%;
        height: 10%;
        transition: opacity 0.5s;
        @include flexbox-layout;
        background: rgba(255, 0, 0, 1);
        opacity: 0.4;
        &:hover {
          opacity: 0.7;
        }
      }


    }
    &:hover {
      .middle {
        opacity: 1;
      }
      .bottom {
        opacity: 1;
        margin-bottom: 0;
      }
    }

    > .bottom {
      z-index: 2;
      opacity: 0;
      position: absolute;
      transition: height 0.5s, opacity 0.5s, margin-bottom 0.5s;
      bottom: 0;
      margin-bottom: -2%;
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
        @include flexbox-layout;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;

        > .left {
          opacity: 0;
          transition: opacity 0.5s, margin-bottom 0.5s;
          align-items: flex-start;
          @include flexbox-layout;
          justify-content: space-between;
          flex-direction: row;
          width: 20%;
          height: 70%;
          margin-bottom: -7%;

          > .prev_video {
            width: 40%;
            height: 100%;
            background: #9d4848;
          }

          > .next_video {
            width: 40%;
            height: 100%;
            background: #9d4848;
          }
        }

        > .right {
          align-items: flex-end;
          @include flexbox-layout;
          flex-direction: row;
          position: relative;
          transition: margin-bottom 0.5s;
          width: 15%;
          height: 70%;
          justify-content: flex-end;
          margin-bottom: -2%;

          > .icon {
            position: absolute;
            opacity: 0;
            align-items: flex-end;
            z-index: 3;
            width: 30%;
            height: 100%;
            transition: height 0.5s, opacity 0.5s;
            background: #a20505;
          }

          > .settings {
            transition: opacity 0.5s, width 0.5s;
            opacity: 0;
            width: 0;
            height: 100%;
            @include flexbox-layout;
            justify-content: space-around;
            background: #736d6d;



            &:hover {
              background: #9d4848;
              width: 100%;

              > .menu {
                justify-content: space-around;
                > .speed {
                  width: 40%;
                }

                > .graphics {
                  width: 40%;
                }
              }

            }


            > .menu {
              width: 100%;
              height: 100%;
              @include flexbox-layout;
              flex-direction: row;

              > .graphics {
                width: 0;
                order: 1;
                transition: width 0.5s;
                height: 100%;
                background: #31a205;
              }

              > .speed {
                width: 0;
                order: 2;
                transition: width 0.5s;
                height: 100%;
                background: #263f1d;
              }


            }


          }

          > .up_arrow {
            transition: opacity 0.5s;
            opacity: 1;
            width: 30%;
            margin-bottom: 13%;
            height: 100%;
            background: #ff0000;
          }
        }
      }

      &:hover {
        height: 10%;

        > ._retractable {
          > .left {
            opacity: 1;
            margin-bottom: 0;
          }

          > .right {
            margin-bottom: 0;
            > .settings {
              opacity: 1;
            }
            > .icon {
              opacity: 0;
            }

            > .up_arrow {
              opacity: 0;
            }
          }
        }
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
