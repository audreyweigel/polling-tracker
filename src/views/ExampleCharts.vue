<template>
  <v-container class="example-charts">
    <h1>Example Charts</h1>
    <v-tabs>
      <v-tab>Bar Chart</v-tab>
      <v-tab>Line Chart</v-tab>
      <v-tab-item>
        <BarChart />
      </v-tab-item>
      <v-tab-item>
        <LineChart />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";

export default {
  name: "ExampleCharts",
  components: { BarChart, LineChart },
};
</script>
