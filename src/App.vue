<template>
  <v-app id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/example-charts">Example Charts</router-link> |
      <router-link to="/feeds">Feeds</router-link>
    </nav>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.full-height {
  min-height: 100vh;
}
</style>
