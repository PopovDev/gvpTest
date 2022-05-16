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
    <div class="controls" :class="{show: paused||progressChanging}" v-show="posterLoaded">
      <div class="top">
        <div class="screen">
          <div class="full_screen" @click="fullScreenClick">
          </div>
          <div class="picture_in_picture" @click="picInPicClick">
          </div>
        </div>
      </div>
      <div class="volumeContainer">
        <Volume :value="volume" @change="setVolume"></Volume>
      </div>
      <div class="middle" @click="playClick">
        <div class="play_btn">
          <img v-if="!paused" src="/icons/pause.PNG" alt="">
          <img v-else src="/icons/play.PNG" alt="">
        </div>
      </div>
      <div class="bottom" :class="{open:progressChanging}">
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
            <div class="prev_video"></div>
            <div class="next_video"></div>
          </div>
          <div class="right">
            <div class="icon"></div>
            <div class="pseudo_icon"></div>
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
          </div>
        </div>
        <div class="up_arrow">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./CVideo/style.scss"></style>
<script lang="ts" src="./CVideo/script.ts"></script>
