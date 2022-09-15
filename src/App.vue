<template>
  <div class="app">
    <h1>Planner</h1>
    <hr>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name:'App',
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
button {
  padding: 5px 15px;
  border: none;
  font-size: 16px;
  background-color: darkseagreen;
  color: black;
  cursor: move;
}
</style>
