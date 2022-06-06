<template>
  <div class="video" ref="videoMain" draggable="false">
    <div class="container">
      <div class="poster">
        <img :src="posterSrc" alt="" v-show="posterLoaded" @load="posterLoaded = true">
      </div>
      <video ref="video"
             poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
             preload="metadata">
      </video>
    </div>
    <div class="controls show" :class="{show: paused||progressChanging}" v-show="posterLoaded&&videoLoaded">
      <div class="top">
        <div class="screen">
          <div class="full_screen" @click="fullScreenClick">
            <img src="/icons/screen.svg" alt="">
          </div>
          <div class="picture_in_picture" @click="picInPicClick">
            <img src="/icons/screen.svg" alt="">
          </div>
        </div>
      </div>
      <div class="volumeContainer show">
        <Volume :value="volume" @change="setVolume"></Volume>
      </div>
      <div class="middle" @click="playClick">
        <div class="play_btn clicked">
          <img v-if="!paused" src="/icons/pause.svg" alt="">
          <img v-else src="/icons/play.svg" alt="">
        </div>

      </div>
      <div class="bottom show" :class="{open:progressChanging}">
        <div class="progress_bar">
          <ProgressBar :progress="videoProgress"
                       @holdChange="progressChangingEmitted"
                       @progressChange="onProgressChange"
                       :total-time="totalTime"
                       :loaded-frags="loadedFrags"
                       class="progress_bar"/>

        </div>
        <div class="retractable">
          <div class="left">
            <div class="time">
              <div class="bg">
                <div class="text">
                  <span class="current">{{ displayTime.current }}</span>
                  <span class="separator">/</span>
                  <span class="total">{{ displayTime.total }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="icon clicked">
              <img src="/icons/setting.svg" alt="">
            </div>
            <div class="pseudo_icon"></div>
          </div>
          <div class="middle">
            <div class="play" @click="playClick">
              <div class="play_btn">
                <img v-if="!paused" src="/icons/pause.svg" alt="">
                <img v-else src="/icons/play.svg" alt="">
              </div>
            </div>
            <div class="prev_video">
              <img src="/icons/prev_arrow.svg" alt="">
            </div>
            <div class="next_video">
              <img src="/icons/next_arrow.svg" alt="">
            </div>
          </div>
          <div class="settings show"></div>
        </div>
      </div>
      <div class="bg">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./CVideo/style.scss"></style>
<script lang="ts" src="./CVideo/script.ts"></script>
