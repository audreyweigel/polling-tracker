<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :return-value.sync="start"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start"
              label="Start date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="start" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.startMenu.save(start)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :return-value.sync="end"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end"
              label="End date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="end" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.endMenu.save(end)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="12" sm="6">
        <v-select
          v-model="selectedPresidents"
          :items="allPresidents"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          hint="Pick presidents to display"
          persistent-hint
        ></v-select>
      </v-col> -->
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
/*import { EventBus } from "/Users/audreywiggles/Documents/NodeProjects/polling-tracker/src/router/EventBus.js";
import { mixIns, Line } from "vue-chartjs";
const { reactiveProp } = mixIns;*/

console.log(csv);
csv.forEach((row) => {
  if (row["Date"]) {
    let dateParts = row["Date"].split("/");
    let date = `${dateParts[2]}-${dateParts[1].padStart(
      2,
      "0"
    )}-${dateParts[0].padStart(2, "0")}`;

    row["Date"] = date;
  }
});

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
      start: "2010-01-01",
      end: "2011-01-01",
      startMenu: false,
      endMenu: false,
      selectedPresidents: [],
    };
  },
  created: function () {
    this.displayDataFromCsv(csv);
  },
  watch: {
    start() {
      this.displayDataFromCsv(csv);
    },
    end() {
      this.displayDataFromCsv(csv);
    },
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
      const uniqueDates = [...new Set(dates)].sort();
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
    limitDataDateRange(data) {
      return data.filter(
        (row) => row["Date"] >= this.start && row["Date"] <= this.end
      );
    },
    displayDataFromCsv: function () {
      // change the data to the format that chart.js needs
      // let data = csv;
      // let data = csv.splice(0, 500); // This uses a smaller amount of data for easier testing
      // console.log(csv);
      let data = this.limitDataDateRange(csv); // This uses a smaller amount of data for easier testing
      let president = this.uniquePresidents(data);
      this.presidents = president;
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
  computed: {
    allPresidents() {
      return this.uniquePresidents(csv);
    },
  },
};
</script>
