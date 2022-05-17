<template>
  <div class="main">
    <div class="header">
    </div>

    <div class="body">
      <div class="mail"></div>
      <div class="password"></div>
      <div class="withGoogle"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LogInPg"
}
</script>

<style scoped lang="scss">

.main {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/2  ;

  > .header {
    display: flex;
    flex-basis: 20% ;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #544f85;
  }

  > .body {
    display: flex;
    flex-basis: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #414141;
    > *{
      height: 30%;
      width: 70%;
      background-color: #31a205;
    }

  }

}

</style>
