<template>
  <div class="main" @click="clickValue" @mousemove="mouseMove" ref="circleMain">
    <div class="circle" :style="{'--volume-percent': value+'%'}">
      <div class="progress"></div>
      <div class="overlay"><span class="text">{{ value }}</span></div>
      <div class="icon"> VolumeIcon</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Emit} from 'nuxt-property-decorator';

@Component({name: 'Volume'})
export default class Volume extends Vue {
  @Prop({default: 0, required: true})
  private readonly value!: number;

  @Emit('change')
  private onChange(value: number) {
    return value;
  }

  private clickValue() {
    if (this.value + 10 >= 100) {
      this.onChange(0);
    } else {
      this.onChange(this.value + 10);
    }
  }

  private mouseMove(e: MouseEvent) {
    const circle = this.$refs.circleMain as HTMLElement;
    const circleHeight = circle.offsetHeight;
    const y = e.clientY - circle.offsetTop;
    const percent = Math.round((y / circleHeight) * 1000) / 10;
    //from 0 to 100 clamp
    this.onChange(100 - Math.max(0, Math.min(percent, 100)));
  }
}
</script>
<style scoped lang="scss">
.main {
  *, > * {
    width: 100%;
    aspect-ratio: 1;
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
      background: rgba(0, 0, 0, 0.2);

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

    &:hover {
      > .overlay {
        > .text {
          opacity: 1;
        }
      }

      > .icon {
        opacity: 0;
      }
    }
  }
}


</style>
