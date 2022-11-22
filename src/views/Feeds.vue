<template>
  <v-container class="feeds" pa-2 ma-0 mb-8 fluid>
    <h1>Feeds</h1>
    <v-card max-width="2000" flat class="mx-auto">
      <v-row v-for="category in categories" :key="category.title">
        <v-col :key="category.title" class="mt-2" cols="12">
          <strong>{{ category.title }}</strong>
        </v-col>

        <v-carousel height="200" :continuous="false" hide-delimiters>
          <v-carousel-item
            v-for="page in Math.ceil(category.items.length / columns)"
            :key="`${category}-${page}`"
            class="px-16"
          >
            <v-row>
              <v-col
                v-for="card in Math.min(
                  category.items.length - (page - 1) * columns,
                  columns
                )"
                :key="`${category}-${page}-${card}`"
                :cols="Math.ceil(12 / columns)"
              >
                <!-- <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
              ></v-skeleton-loader> -->
                <v-card
                  @click="cardClick(getItemFromCategory(category, page, card))"
                >
                  <v-img
                    :src="getImgUrlFromItem(category, page, card)"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <p class="text-justify text-h6 px-2">
                      {{
                        getItemFromCategory(category, page, card)?.title || ""
                      }}
                    </p>
                    <p class="text-justify text-caption px-2">
                      {{
                        getItemFromCategory(category, page, card)?.pubDate || ""
                      }}
                    </p>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-card>
    <Snackbar v-model="snackbarMsg"></Snackbar>
    <Dialog
      v-model="showDialog"
      :title="dialog.title"
      :content="dialog.content"
      :link="dialog.link"
    ></Dialog>
  </v-container>
</template>

<script>
import Snackbar from "@/components/Snackbar";
import Dialog from "@/components/Dialog";

import Parser from "rss-parser";
let parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml",
  },
  customFields: {
    item: ["media:content"],
  },
});

export default {
  name: "FeedsView",
  components: {
    Snackbar,
    Dialog,
  },
  data() {
    return {
      imgUrl: "",
      snackbarMsg: "",
      categories: [],
      feeds: [
        "https://rss.politico.com/healthcare.xml",
        "https://rss.politico.com/economy.xml",
        "https://rss.politico.com/politics-news.xml",
      ],
      showDialog: false,
      dialog: {
        title: "",
        content: "",
        link: "",
      },
    };
  },
  async created() {
    this.showFeeds();
  },
  methods: {
    async showFeeds() {
      await Promise.all(
        this.feeds.map(async (rssFeed) => {
          return parser
            .parseURL("http://localhost:8081/" + rssFeed)
            .then((feed) => {
              this.categories.push(feed);
              console.log(feed);
            });
        })
      ).catch((error) => {
        this.snackbarMsg =
          "Is the CORS dev server running? Try: npm run cors-dev-server";
        console.log(error);
      });
    },
    getItemFromCategory(category, page, card) {
      return category.items[(page - 1) * this.columns + (card - 1)];
    },
    getImgUrlFromItem(category, page, card) {
      let item = this.getItemFromCategory(category, page, card);

      try {
        return item["media:content"].$.url;
      } catch (error) {
        return "";
      }
    },
    cardClick(item) {
      this.dialog.title = item.title;
      this.dialog.content = item.content;
      this.dialog.link = item.link;
      this.showDialog = true;
    },
  },
  computed: {
    columns() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
        default:
          return 3;
      }
    },
  },
};
</script>
