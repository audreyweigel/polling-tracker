<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>

      <v-card-text>
        {{ content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :href="link">Source</v-btn>
        <v-btn text @click="showDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogComponent",
  props: ["show", "title", "content", "link"],
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
