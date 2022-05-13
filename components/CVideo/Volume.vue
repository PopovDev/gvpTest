<template>
  <div class="set-size main">

    <div class="progress_bar progress-45 style-2">
      <span class="label">45<span class="smaller">%</span></span>
      <div class="pie">
        <div class="left-side half-circle"></div>
        <div class="right-side half-circle"></div>
      </div>
      <div class="shadow"></div>
    </div>
</div>
</template>

<script>
export default {
  name: "Volume"
}
</script>

<style scoped lang="scss">

$bg-color: #34495e;
$default-size: 100%;
$label-font-size: $default-size / 4;
$label-font-size-redo: $default-size * 4;

@mixin size($width, $height) {
  height: $height;
  width: $width;
}

@mixin draw-progress($progress, $color) {
  .pie {
    .half-circle {
      border-color: $color;
    }

    .left-side {
      transform: rotate($progress * 3.6deg);
    }

    @if $progress <= 50 {
      .right-side {
        display: none;
      }
    } @else {
      clip: rect(auto, auto, auto, auto);

      .right-side {
        transform: rotate(180deg);
      }
    }
  }
}

*{
  width: 100%;
  height: 100%;
}

.main {
  &:after {
    clear: both;
    content: '';
    display: table;
  }
}

.progress_bar {
  @include size($default-size, $default-size);
  float: left;
  position: relative;

  &:nth-child(3n + 1) {
    clear: both;
  }

  .pie {
    @include size(100%, 100%);
    clip: rect(0, $default-size, $default-size, $default-size / 2);
    left: 0;
    position: absolute;
    top: 0;

    .half-circle {
      @include size(100%, 100%);
      border: ($default-size / 10) solid #3498db;
      border-radius: 50%;
      clip: rect(0, $default-size / 2, $default-size, 0);
      left: 0;
      position: absolute;
      top: 0;
    }
  }

  .label {
    background: $bg-color;
    border-radius: 50%;
    color: #ecf0f1;
    cursor: default;
    display: block;
    position: absolute;
    text-align: center;
    .smaller {
      color: #bdc3c7;
      font-size: .45em;
      vertical-align: super;
    }
  }

  .shadow {
    @include size(100%, 100%);
    border: $default-size / 10 solid #bdc3c7;
    border-radius: 50%;
  }

  &.style-2 {
    .label {
      background: none;
      color: #7f8c8d;

      .smaller {
        color: #bdc3c7;
      }
    }
  }

  &.progress-45 {
    @include draw-progress(45, #1abc9c);
  }
}

</style>
