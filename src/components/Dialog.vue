<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card class="text-left text-justify">
      <v-container>
        <p class="text-h6 mb-2">{{ item.title }}</p>

        <v-divider></v-divider>

        <p class="text-caption mb-0">{{ item.pubDate }}</p>
        <p class="text-caption mt-0">{{ item.creator }}</p>

        <p class="body-1">
          {{ item.content }}
        </p>

        <v-img
          v-if="
            item['media:content'] &&
            !item['media:content'].$.url.endsWith('.mp4')
          "
          :src="item['media:content'].$.url"
          class="mb-2"
        >
          <template slot="placeholder">
            <v-img src="../assets/politico-billboard.png"></v-img>
          </template>
        </v-img>

        <v-card
          v-if="item['content:encoded']"
          flat
          v-html="item['content:encoded']"
          class="content-encoded body-1"
        ></v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :href="item.link" target="_blank">
            Source
          </v-btn>
          <v-btn text @click="showDialog = false">Close</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogComponent",
  props: ["show", "item"],
  model: {
    prop: "show",
    event: "update",
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(newVal) {
        this.$emit("update", newVal);
      },
    },
  },
};
</script>

<style scoped>
::v-deep .content-encoded * {
  width: 100%;
}
</style>
