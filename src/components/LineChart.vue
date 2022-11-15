<template>
  <LineChartGenerator
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
</template>

<script>
import csv from "@/assets/approval_polls.csv";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          "1964",
          "Truman",
          "Einsenhower",
          "Kennedy",
          "Johnson",
          "Nixon",
          "Ford",
          "Carter",
          "Reagan",
          "Bush",
          "Clinton",
          "Bush",
          "Obama",
          "Trump",
        ],
        datasets: [
          {
            label: "Roosevelt",
            backgroundColor: "#f0f8ff",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
          {
            label: "Data Two",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created: function () {
    this.displayDataFromCsv(csv);
  },
  methods: {
    displayDataFromCsv: function () {
      console.log(csv);
      let data = [];
      let labels = [];

      for (let i = 0; i < csv.length; i++) {
        let date = csv[i].Date;
        labels.push(date);
        let president = csv[i].President;
        data.push(president);
        this.chartData.datasets[0].data = labels;
      }
      //this.chartData.datasets[0].data = data;
      //this.chartData.datasets[0].data = csv.GetComponents();
      //this.chartData.datasets[1].data = [80, 10, 10, 50, 40, 50, 60];
    },
  },
};
</script>
