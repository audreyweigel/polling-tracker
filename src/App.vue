<template>
  <v-app id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/example-charts">The Data</router-link> |
      <router-link to="/feeds">Feeds</router-link>
    </nav>
    <router-view />
  </v-app>
</template>

<script>
import csv from "@/assets/approval_polls.csv";
csv.forEach((row) => {
  if (row["Date"]) {
    let dateParts = row["Date"].split("/");

    if (dateParts.length) {
      let date = `${dateParts[2]}-${dateParts[1].padStart(
        2,
        "0"
      )}-${dateParts[0].padStart(2, "0")}`;

      row["Date"] = date;
    }
  }
});

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
