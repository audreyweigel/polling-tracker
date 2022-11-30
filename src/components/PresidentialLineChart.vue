<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedPresidents"
          :items="allPresidents"
          :menu-props="{
            closeOnClick: false,
            closeOnContentClick: false,
            disableKeys: true,
            openOnClick: false,
            maxHeight: 304,
          }"
          label="Select"
          multiple
          hint="Pick presidents to display"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script>
import csv from "@/assets/approval_polls.csv";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import commonMethods from "@/mixins/commonMethods.js";
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
      // show selected presidents on chart
      selectedPresidents: [],
    };
  },
  created: function () {
    this.displayDataFromCsv(csv);
  },
  watch: {
    selectedPresidents() {
      this.displayDataFromCsv();
    },
    start() {
      this.displayDataFromCsv();
    },
    end() {
      this.displayDataFromCsv();
    },
  },
  methods: {
    presidentDates(data) {
      let tempData = data.filter((row) =>
        this.selectedPresidents.includes(row["President"])
      );
      return this.uniqueDates(tempData);
    },
    displayDataFromCsv: function () {
      // change the data to the format that chart.js needs
      // let data = csv;
      // let data = csv.splice(0, 500); // This uses a smaller amount of data for easier testing
      // console.log(csv);
      let data = this.limitDataDateRange(csv); // This uses a smaller amount of data for easier testing
      let president = this.selectedPresidents;
      // this.presidents = president;
      let date = this.uniqueDates(data);
      console.log(date);
      //let poll = this.uniquePolls(data);
      let datasets = [];
      for (let i = 0; i < president.length; i++) {
        let presData = [];
        for (let j = 0; j < date.length; j++) {
          let temp = data.filter((item) => item.Date === date[j]);
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
        console.log(president[i]);
        console.log(presData);
      }
      this.chartData = {
        labels: date,
        datasets: datasets,
      };
      console.log(this.chartData);
    },
  },
  computed: {
    allPresidents() {
      return this.uniquePresidents(csv);
    },
    start() {
      for (let i = 0; i < csv.length; i++) {
        if (this.selectedPresidents.includes(csv[i]["President"])) {
          return csv[i]["Date"];
        }
      }
      return "";
    },
    end() {
      for (let i = csv.length - 1; i >= 0; i--) {
        if (this.selectedPresidents.includes(csv[i]["President"])) {
          return csv[i]["Date"];
        }
      }
      return "";
    },
  },
};
</script>
