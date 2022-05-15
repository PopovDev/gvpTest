<template>
  <div class="main">
    <div class="videoC">
      <CVideo v-if="video"></CVideo>
    </div>
  </div>
</template>
<script lang="ts">
import {Action, Component, Getter, Vue,} from 'nuxt-property-decorator';

@Component({name: 'Index'})
export default class Index extends Vue {
  @Getter("video/showingVideo")
  private video!: IVideo | null;
  @Action("video/loadVideo")
  private loadVideo!: Function;
  @Action("video/setShowingVideo")
  private setShowingVideo!: Function;

  public head() {
    return {title: "Video Player"}
  }

  async validate({params, store}: any) {
    return await store.dispatch("video/videoExists", params.id)
  }

  async fetch() {
    const id = this.$route.params.id;
    await this.loadVideo(id);
    await this.setShowingVideo(id);
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
