<template>
  <v-container class="feeds">
    <h1>Feeds</h1>
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      max-height="150"
      max-width="250"
      :src="imgUrl"
    ></v-img>
    <v-row>
      <template v-for="n in 4">
        <v-col :key="n" class="mt-2" cols="12">
          <strong>Category {{ n }}</strong>
        </v-col>

        <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2">
          <!-- <v-sheet height="150"></v-sheet> -->
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
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
  data() {
    return {
      imgUrl: "",
    };
  },
  async created() {
    console.log("on feeds");
    let feed;
    // const rssFeed = "https://rss.politico.com/congress.xml";
    const rssFeed = "https://rss.politico.com/healthcare.xml";
    await parser
      .parseURL("http://localhost:8081/" + rssFeed)
      .then((data) => {
        feed = data;
        this.imgUrl = feed.items[1]["media:content"].$.url;
        console.log(feed);
      })
      .catch((error) => {
        console.log(
          "Is the CORS dev server running? Try:\nnpm run cors-dev-server"
        );
        console.log(error);
      });
  },
};
</script>
