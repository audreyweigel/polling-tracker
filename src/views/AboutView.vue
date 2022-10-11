<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BarChart />
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";

export default {
  name: "AboutView",
  components: { BarChart },
};
</script>
