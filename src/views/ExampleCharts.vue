<template>
  <v-container class="example-charts">
    <div class="text-decoration-underline">
      <h1>The Data</h1>
    </div>
    <div>
      <p>
        Given that Gallup's data has been used for many decades and is
        considered to be the most accurate for comparing different Presidents
        approval ratings, that information was used to compare approval and
        disapproval ratings over time.
      </p>
      <br />
      <p>
        The data was collected from Kaggle and was downloaded as a CSV file.
        Data Camp collected the data from Gallup and made it available to the
        public.
      </p>
      <br />
      <h4>
        You can access the dataset
        <a
          href="https://www.kaggle.com/datasets/vkat72293/presidential-approval-ratings"
          >here!</a
        >
      </h4>
      <br />
    </div>
    <v-tabs>
      <v-tab>Comparing Presidents</v-tab>
      <v-tab>Over Time</v-tab>
      <v-tab>By President</v-tab>
      <v-tab>Interactivity</v-tab>
      <v-tab-item>
        <br />
        <h2>Highest Ratings</h2>
        <br />
        <h3>
          Comparing every President's highest approval and disapproval ratings.
        </h3>
        <BarChart />
        <h2>Lowest Ratings</h2>
        <br />
        <h3>
          Here we compare every President's lowest approval and disapproval
          ratings.
        </h3>
        <BarChartCopy />
      </v-tab-item>
      <v-tab-item>
        <br />
        <h2>Approval Ratings Over Time</h2>
        <br />
        <h3>
          Select a date range to visualize Presidential approval ratings over
          time.
        </h3>
        <LineChart />
      </v-tab-item>
      <v-tab-item>
        <br />
        <h2>Presidential Approval</h2>
        <br />
        <h3>
          Select different presidents to visualize their approval ratings over
          time.
        </h3>
        <PresidentialLineChart />
      </v-tab-item>
      <v-tab-item>
        <br />
        <h2>Interactivity</h2>
        <br />
        <h3>
          Select different presidents to visualize their approval ratings over
          time.
        </h3>
        <InteractiveChart />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import BarChart from "@/components/BarChartHighest";
import BarChartCopy from "@/components/BarChartLowest";
import LineChart from "@/components/DateLineChart";
import PresidentialLineChart from "@/components/PresidentialLineChart";
import InteractiveChart from "@/components/InteractiveChart";

export default {
  name: "ExampleCharts",
  components: {
    BarChart,
    BarChartCopy,
    LineChart,
    PresidentialLineChart,
    InteractiveChart,
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

.v-tab-bar {
  overflow-x: auto;
}

h3 {
  color: rgb(156, 102, 142);
}

h4 {
  color: rgb(156, 102, 142);
}

.example-charts {
  margin: 0 auto;
  max-width: 700px;
}
</style>
