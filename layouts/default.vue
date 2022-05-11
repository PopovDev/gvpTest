<template>
  <div class="app">
    <div class="header">
        <div>
            <h1>Aboba</h1>
        </div>
    </div>
    <nuxt/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
.app{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.header{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3aa293;
}
</style>
