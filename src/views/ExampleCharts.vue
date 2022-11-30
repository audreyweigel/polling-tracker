<template>
  <v-container class="example-charts">
    <div class="text-decoration-underline">
      <h1>The Data</h1>
    </div>
    <v-tabs>
      <v-tab>Bar Chart</v-tab>
      <v-tab>Line Chart</v-tab>
      <v-tab-item>
        <h2>Highest Ratings</h2>
        <li></li>
        <h3>
          Comparing every President's highest approval and disapproval ratings.
        </h3>
        <BarChart />
        <h2>Lowest Ratings</h2>
        <li></li>
        <h3>
          Here we compare every President's lowest approval and disapproval
          ratings.
        </h3>
        <BarChartCopy />
      </v-tab-item>
      <v-tab-item>
        <LineChart />
        <TrumanLineChart />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import BarChart from "@/components/BarChartHighest";
import BarChartCopy from "@/components/BarChartLowest";
//import LineChart from "@/components/LineChart";
import TrumanLineChart from "@/components/TrumanLineChart";

export default {
  name: "ExampleCharts",
  components: {
    BarChart,
    BarChartCopy,
    //LineChart,
    TrumanLineChart,
  },
};
</script>

<style>
.text-decoration-underline {
  color: #9f1870;
}

h2 {
  color: #9f1870;
}

h3 {
  color: rgb(156, 102, 142);
}

.example-charts {
  margin: 0 auto;
  max-width: 800px;
}
</style>
