<template>
  <div class="main">
    <div class="videoC">
      <CVideo :video="video" v-if="video"></CVideo>
    </div>
  </div>
</template>
<script lang="ts">
import {Action, Component, Getter, Vue,} from 'nuxt-property-decorator';

@Component({name: 'Index'})
export default class Index extends Vue {
  @Getter("video/showingVideo")
  private video!: IVideo | null;

  public head() {
    return {title: this.video?.title};
  }

  async validate({params, store}: any) {
    return await store.dispatch("video/videoExists", params.id)
  }

  async fetch({params, store}: any) {
    await store.dispatch("video/loadVideo", params.id);
    await store.dispatch("video/setShowingVideo", params.id);
  }
}


</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .videoC {
    flex-basis: 70%;
  }
}

</style>
