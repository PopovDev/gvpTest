<template>
  <div class="app">
    <div class="header">
      <div>
        <NuxtLink to="/">
          <h1>むだ</h1>
        </NuxtLink>

      </div>
    </div>
    <div class="body">


      <div class="login">
        <LogInPg/>
      </div>


      <nuxt/>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #414141;


  > .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #544f85;
  }

  > .body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .login{
      position: absolute;
      z-index: 60;
      height: 70%;
      aspect-ratio: 1/2;
      background-color: rebeccapurple;
    }
  }
}

</style>
<script lang="ts">
import {Action, Component, Getter, Vue,} from 'nuxt-property-decorator';

@Component({name: 'DefaultLayout'})
export default class DefaultLayout extends Vue {
  private mounted() {

    this.$fire.appCheck.activate("abcdefghijklmnopqrstuvwxy-1234567890abcd", true);
  }
}


</script>
