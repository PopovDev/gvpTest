<template>
  <div class="main">
    <div class="videoC" v-if="true">
      <CVideo></CVideo>
    </div>

    <div class="volumeContainer">
      <Volume v-model="value" @change="valueChange"></Volume>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      title: "Home"
    };
  },
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    valueChange(value: number) {
      this.value = value;
    }
  },
  async mounted() {
    this.value = 15;

  }


});
</script>
<style scoped lang="scss">
.volumeContainer {
  flex-basis: 30%;
}

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
