<template>
  <div class="home">
    <img alt="Polling Tracker Logo" src="../assets/Abraham_Lincoln.gif" />
    <HelloWorld msg="United States Presidential Approval Ratings" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
