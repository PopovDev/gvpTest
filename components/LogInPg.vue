<template>
  <div class="main">
    <div class="header">
      LogIn
    </div>

    <div class="body">
      <div class="login">
        <div class="mail">
          <input type="text" placeholder="mail"/>
        </div>
        <div class="password">
          <input type="password" placeholder="password"/>
        </div>
      </div>
      <div class="withGoogle"></div>
    </div>

  </div>
</template>

<script>
</script>

<style scoped lang="scss">

.main {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/2;

  > .header {
    display: flex;
    flex-basis: 20%;
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
    justify-content: space-around;
    align-items: center;
    background: #8f157a;

    > * {
      width: 70%;
    }

    > .login {

      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      > .mail {
        height: 20%;
        width: 100%;
        background-color: aliceblue;
        color: black;
        justify-content: center;
        display: flex;

        > input {
          width: 98%;
          height: 100%;

          border: none;
          cursor: pointer;
        }

      }

      > .password {
        height: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: aliceblue;
        color: black;
        > input {
          width: 98%;
          height: 100%;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }

    > .withGoogle {
      width: 20%;
      aspect-ratio: 1;
      transition: background-color .5s;
      cursor: pointer;

      background-color: #31a205;
      &:hover {
        background-color: #40ce07;
      }
    }

  }

}

</style>
