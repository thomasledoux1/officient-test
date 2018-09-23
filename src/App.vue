<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <EmployeeList msg="Welcome to Your Vue.js App"/>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  margin-bottom: 30px;
}

@font-face {
  font-family: 'roboto';
  src:
       url('./assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
</style>
