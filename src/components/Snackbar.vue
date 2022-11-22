<template>
  <v-snackbar :timeout="-1" :value="msg" tile color="red accent-2">
    <span>{{ msg }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$emit('update', '')"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: ["msg"],
  model: {
    prop: "msg",
    event: "update",
  },
};
</script>
