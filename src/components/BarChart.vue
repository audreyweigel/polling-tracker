<template>
  <v-container>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </v-container>
</template>

<script>
import csv from "@/assets/approval_polls.csv";
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            label: "January",
            data: [40, 20, 12],
            backgroundColor: "#f87979",
          },
          {
            label: "Febuary",
            data: [20, 10, 22],
            backgroundColor: "#f87979",
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  created: function () {
    this.displayDataFromCSV(csv);
  },
  methods: {
    uniquePresidents: function (data) {
      // get presidents from presidents column
      const presidents = data.map((row) => row["President"]);
      // remove duplicates
      let uniquePresidents = new Set(presidents);
      uniquePresidents.delete("\n");
      uniquePresidents = [...uniquePresidents].sort();
      return uniquePresidents;
    },
    uniqueApprovals: function (data) {
      const approval = data.map((row) => row["Approve"]);
      const uniqueApproval = [...new Set(approval)];
      return uniqueApproval;
    },
    displayDataFromCSV: function () {
      let data = csv;
      let president = this.uniquePresidents(data);
      let datasets = [];
      let presData = [];
      for (let i = 0; i < president.length; i++) {
        // only return the highest approval rating for each president
        presData.push(
          data
            .filter((row) => row["President"] === president[i])
            .reduce((max, p) => (p["Approve"] > max ? p["Approve"] : max), 0)
        );
      }
      datasets.push({
        label: "Approval Ratings",
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
        data: presData,
      });
      datasets.push({
        label: "Disapproval Ratings",
        backgroundColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
        data: presData,
      });
      this.chartData = {
        labels: president,
        datasets: datasets,
      };
    },
  },
};
</script>
