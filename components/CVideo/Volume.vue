<template>
  <div class="main"
       @click="clickValue"
       @mousemove="mouseMove"
       @mousedown="mouseDown"
       ref="circleMain">
    <div class="circle" :style="{'--volume-percent': value+'%'}" :class="{active: hold}">
      <div class="progress"></div>
      <div class="overlay">
        <span class="text" v-if="value>0">{{ Math.round(value) }}</span>
        <span class="text" v-else>Muted</span>
      </div>
      <div class="icon"> VolumeIcon</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'nuxt-property-decorator';

@Component({name: 'Volume'})
export default class Volume extends Vue {
  @Prop({default: 0, required: true, type: Number})
  private readonly value!: number;

  private readonly mainEl = (this.$parent.$el as HTMLElement);

  private hold = false;
  private holdStartY = 0;
  private holdDStartY = 0;
  private valueBeforeMute: number = 100;

  @Emit('change')
  private onChange(value: number) {
    return Math.max(0, Math.min(value, 100));
  }

  private unmute() {
    this.onChange(this.valueBeforeMute);
    this.valueBeforeMute = 100;
  }

  private mute() {
    this.valueBeforeMute = this.value;
    this.onChange(0);
  }

  private clickValue(e: MouseEvent) {
    if (Math.abs(e.clientY - this.holdDStartY) > 2) return;
    if (this.value === 0) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  private onScroll(e: WheelEvent) {
    this.onChange(this.value - 5 * Math.sign(e.deltaY));
  }

  private mouseDown(e: MouseEvent) {
    this.hold = true;
    this.holdStartY = e.clientY;
    this.holdDStartY = this.holdStartY;
  }

  private mouseUp(_e: MouseEvent) {
    this.hold = false;
  }

  private mouseMove(e: MouseEvent) {
    if (this.hold) {
      const delta = ((e.clientY - this.holdStartY)) / 2;
      const newValue = this.value - delta;

      this.onChange(Math.max(0, Math.min(newValue, 100)));
      this.holdStartY = e.clientY;
    }
  }

  private static touchToMouse(e: TouchEvent) {
    return new MouseEvent("", {
      clientY: e.touches[0]?.clientY || 0,
      clientX: e.touches[0]?.clientX || 0,
    })
  }
  private setupEvents(){
    this.mainEl?.addEventListener('wheel', this.onScroll);

    document?.addEventListener('mouseup', this.mouseUp);
    document?.addEventListener('mousemove', this.mouseMove);

    (this.$el as HTMLElement)?.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this.mouseDown(Volume.touchToMouse(e));
    });
    (this.$el as HTMLElement)?.addEventListener('touchend', (e: TouchEvent) => {
      e.preventDefault();
      this.mouseUp(Volume.touchToMouse(e));
    });
    (this.$el as HTMLElement)?.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault();
      this.mouseMove(Volume.touchToMouse(e));
    });
  }

  private mounted() {
      this.setupEvents();
  }

  private beforeDestroy() {

    this.mainEl?.removeEventListener('wheel', this.onScroll);
    document?.removeEventListener('mouseup', this.mouseUp);
    document?.removeEventListener('mousemove', this.mouseMove);

  }
}
</script>
<style scoped lang="scss">
.main {
  *, > * {
    width: 100%;
    aspect-ratio: 1;
    color: white;
  }

  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @mixin circle {
    border-radius: 50%;
  }
  user-select: none;

  > .circle {
    &, > .progress {
      @include circle;
    }

    @include flex-center;
    position: relative;

    > * {
      transition: opacity .5s;
    }

    > .overlay {
      position: absolute;
      width: 70% !important;
      height: 70% !important;
      @include circle;
      background: rgba(0, 0, 0, 0.4);

      > .text {
        font-size: 1.5rem;
        opacity: 0;
        @include flex-center;
      }

      &:before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        padding: 10%; // change if procent changing
        background: conic-gradient(rgb(3, 133, 255, 0.7) var(--volume-percent), rgba(242, 242, 242, 0.3) var(--volume-percent));
        mask: linear-gradient(#fff, #fff, #fff, #fff, #fff, #fff) content-box, linear-gradient(#fff, #fff, #fff, #fff, #fff, #fff);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;

      }
    }

    > .icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      color: #fff;
      @include flex-center;
    }

    @mixin itemHover {
      > .overlay {
        > .text {
          opacity: 1;
        }
      }
      > .icon {
        opacity: 0;
      }
    }

    &:hover {
      @include itemHover;
    }

    &:active {
      @include itemHover;
    }
  }
}


</style>
