<template>
  <div class="main">

    <h1>Links:</h1>
    <div class="links">
      <div class="link">
        <NuxtLink to="player/0">First video</NuxtLink>
      </div>
      <div class="link">
        <NuxtLink to="player/1">Second video</NuxtLink>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {Action, Component, Getter, Vue,} from 'nuxt-property-decorator';

@Component({name: 'Index'})
export default class Index extends Vue {


}


</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .links {
    display: flex;
    > div {
      margin: 0 1rem;
      padding: 30px;
      background: #31a205;

    }
  }
}
</style>
