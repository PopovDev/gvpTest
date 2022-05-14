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
  private video: IVideo | null = null;
  @Getter("videos/list")
  private videos!: IVideo[];
  @Action("videos/fetchVideos")
  private fetchVideos!: Function;

  public head() {
    return {title: "Video Player"}
  }

  async fetch() {
    await this.fetchVideos();
    this.video = this.videos[Number(this.$route.params!.id)|0];

    console.log(this.video);
  }

  private mounted() {


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
