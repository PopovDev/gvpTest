<template>
  <div class="main">
    <div
      class="progress"
      ref="progress"
      @mousedown="onMouseDown"
    >
      <div class="bar" :style="{'width': progress+'%'}"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'nuxt-property-decorator';

@Component({name: 'ProgressBar'})
export default class CVideo extends Vue {
  @Prop({type: Number, default: 0, required: true})
  private readonly progress!: number;

  @Emit('progressChange')
  private progressChange(progress: number) {
    return progress;
  }

  @Emit('holdChange')
  private holdChange(hold: boolean) {
    this.hold = hold;
    return hold;
  }

  private hold: boolean = false;

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
.main
  width: 100%
  height: 100%

  .progress
    width: 100%
    height: 100%
    background: #ff0000
    cursor: pointer

    .bar
      background: #3400ff
      height: 100%
</style>
