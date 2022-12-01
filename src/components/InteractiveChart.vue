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
    ref="lineChart"
  />
</template>

<script>
//import csv from "@/assets/approval_polls.csv";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import commonMethods from "@/mixins/commonMethods.js";
//import { EventBus } from "@/router/EventBus.js";
const Chart = require("chart.js");

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
  mixins: [commonMethods],
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
    lineChart: {
      type: Object,
      default: () => {},
    },
    // options: {
    //   type: Object,
    //   default: () => {},
    //   events: ["click"],
    //   onClick: (e) => {
    //     // on click, get the active elements
    //     const activePoints = this.$refs.lineChart.chart;
    //     const canvasPosition = Chart.helpers.getRelativePosition(
    //       e,
    //       activePoints
    //     );

    //     // Substitute the appropriate scale IDs
    //     const dateX = activePoints.scales.x.getValueForPixel(canvasPosition.x);
    //     const approvalY = activePoints.scales.y.getValueForPixel(
    //       canvasPosition.y
    //     );

    //     // redirect to the appropriate page
    //     this.$router.push({
    //       name: "presidential",
    //       params: {
    //         date: dateX,
    //         approval: approvalY,
    //       },
    //     });
    //   },
    // },
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
        onClick: (e) => {
          // on click, get the active elements
          const activePoints = this.$refs.lineChart.getCurrentChart();
          // let newChart = new ChartJS();
          console.log(Chart);
          const canvasPosition = Chart.helpers.getRelativePosition(
            e,
            activePoints
          );

          // Substitute the appropriate scale IDs
          const dateX = activePoints.scales.x.getValueForPixel(
            canvasPosition.x
          );
          const approvalY = activePoints.scales.y.getValueForPixel(
            canvasPosition.y
          );
          console.log(dateX, " ", approvalY);
        },
      },
      // show selected presidents on chart
      selectedPresidents: [],
    };
  },
  /*created: function () {
    this.displayDataFromCsv(csv);
  },*/
  methods: {
    /*onClick(labels) {
      var activePoint = this.chart.getElementAtEvent(labels);
      console.log(activePoint);
      var selectedPoint = activePoint[0];
      selectedPoint.custom = this.selectedPoint.custom || {};
      selectedPoint.custom.backgroundColor = "rgba(128,128,128,1)";
      selectedPoint.custom.radius = 7;
    },*/
    /*clickHandler(evt) {
        const points = this.chart.getElementsAtEventForMode(
          evt,
          "nearest",
          { intersect: true },
          true
        );
        if (points.length) {
          const firstPoint = points[0];
          const label = this.chart.data.labels[firstPoint.index];
          const value =
            this.chart.data.datasets[firstPoint.datasetIndex].data[
              firstPoint.index
            ];
        }
      },*/
  },
};
</script>
