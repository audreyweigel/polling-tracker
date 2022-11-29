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
/*import { EventBus } from "/Users/audreywiggles/Documents/NodeProjects/polling-tracker/src/router/EventBus.js";
import { mixIns, Line } from "vue-chartjs";
const { reactiveProp } = mixIns;*/

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
  //extends: Line,
  components: {
    LineChartGenerator,
  },
  //mixins: [reactiveProp],
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
  /*mounted() {
    const self = this;
    console.log(self);
    this.options.onClick = function (e, tooltipItems) {
      console.log(tooltipItems[0].__ob__);
      EventBus.$emit("chart-click", tooltipItems[0].__index);
    };
    this.renderChart(this.chartData, this.options);
  },*/
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
    uniquePresidents: function (data) {
      // get presidents from presidents column
      const presidents = data.map((row) => row["President"]);
      // remove duplicates
      let uniquePresidents = new Set(presidents);
      // remove unnecessary "\n" entry
      uniquePresidents.delete("\n");
      uniquePresidents = [...uniquePresidents].sort();
      return uniquePresidents;
    },
    uniqueDates: function (data) {
      const dates = data.map((row) => row["Date"]);
      const uniqueDates = [...new Set(dates)].sort((a, b) => {
        if (a.slice(-4) === b.slice(-4)) {
          return a.slice(0, 2) - b.slice(0, 2);
        }
        return a.slice(-4) - b.slice(-4);
      });
      return uniqueDates;
    },
    uniqueApproval: function (data) {
      const approval = data.map((row) => row["Approve"]);
      const uniqueApproval = [...new Set(approval)];
      return uniqueApproval;
    },
    uniqueDisapproval: function (data) {
      const disapproval = data.map((row) => row["Disapprove"]);
      const uniqueDisapproval = [...new Set(disapproval)];
      return uniqueDisapproval;
    },
    displayDataFromCsv: function () {
      // change the data to the format that chart.js needs
      let data = csv;
      // let data = csv.splice(0, 500); // This uses a smaller amount of data for easier testing
      let president = this.uniquePresidents(data);
      let date = this.uniqueDates(data);
      //let poll = this.uniquePolls(data);
      let datasets = [];
      for (let i = 0; i < president.length; i++) {
        let presData = [];
        for (let j = 0; j < date.length; j++) {
          let temp = data.filter(
            (item) => item.Date === date[j] && item.President === president[i]
          );
          if (temp.length > 0) {
            presData.push(temp[0].Approve);
          } else {
            presData.push("N/A");
          }
        }
        datasets.push({
          label: president[i],
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: presData,
        });
      }
      this.chartData = {
        labels: date,
        datasets: datasets,
      };
      console.log(this.chartData);
    },
  },
};
</script>
