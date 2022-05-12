<template>
  <div class="main">
    <h4>{{ someData }}</h4>
    <div class="videoC">
      <CVideo></CVideo>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      someData: ""
    }
  },
  methods: {

  },
  async mounted() {




  }


});
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
