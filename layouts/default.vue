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
  }
}

</style>
