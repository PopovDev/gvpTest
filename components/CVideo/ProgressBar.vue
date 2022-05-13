<template>
  <div class="main">
    <div
      class="progress_bar"
      ref="progress"
      @mousedown="onMouseDown"
    >
      <div class="display">
        <div class="bar" :style="{'width': progress+'%'}">
        </div>
        <div class="downloaded">
          <div class="element"
               v-for="(el,i) in this.loadedArray"
               :key="i"
               :style="{'width': el.width+'%', 'margin-left': el.left+'%'}"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'nuxt-property-decorator';

declare interface IBarNode {
  width: number;
  left: number;
}

@Component({name: 'ProgressBar'})
export default class CVideo extends Vue {
  @Prop({type: Number, default: 0, required: true})
  private readonly progress!: number;
  @Prop({type: Number, default: 0, required: true})
  private readonly totalTime!: number;
  @Prop({required: true})
  private readonly loadedFrags!: TimeRanges | null;

  @Emit('progressChange')
  private progressChange(progress: number) {
    return progress;
  }

  @Emit('holdChange')
  private holdChange(hold: boolean) {
    this.hold = hold;
    return hold;
  }
  public loadedArray: IBarNode[] = [];
  private hold: boolean = false;

  @Watch('loadedFrags')
  private onLoadedFragsChange(el: TimeRanges) {
    if (!el) return;
    const count = el.length;
    this.loadedArray = [];
    console.log(this.totalTime);
    for (let i = 0; i < count; i++) {
      const start = el.start(i);
      const end = el.end(i);
      const node: IBarNode = {
        width: (end - start) / this.totalTime * 100,
        left: start / this.totalTime * 100,
      }
      this.loadedArray.push(node);
    }

  }

  private onMouseDown(event: MouseEvent) {

    this.holdChange(true);
    this.progressMove(event, true);
  }

  private onMouseUp() {
    this.holdChange(false);
  }

  private progressMove(e: MouseEvent, isClick: boolean = false) {
    if (!this.hold && !isClick) return;
    const progressElement = this.$refs.progress as HTMLElement;
    const progressWidth = progressElement.offsetWidth;
    const progressX = progressElement.getBoundingClientRect().left;
    const progress = (e.clientX - progressX) / progressWidth * 100;
    this.progressChange(Math.min(Math.max(progress, 0), 100));
  }


  public mounted() {
    document.addEventListener('mousemove', this.progressMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  public beforeDestroy() {
    document.removeEventListener('mousemove', this.progressMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }


}
</script>

<style scoped lang="sass">
$background-color: rgba(33, 32, 32, 0.4)
$height: 35%
$progress-color: rgba(63, 167, 242, 0.79)
$loaded-color: rgba(151, 252, 140, 0.44)
*
  width: 100%
  height: 100%

.main
  > .progress_bar
    cursor: pointer
    display: flex
    flex-direction: column
    justify-content: center

    > .display
      height: $height
      background: $background-color
      position: relative

      > .bar
        background: $progress-color
        position: absolute
        z-index: 1

      > .downloaded
        position: relative

        > *
          background: $loaded-color
          position: absolute


</style>
