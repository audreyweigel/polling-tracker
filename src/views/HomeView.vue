<template>
  <div class="intro">
    <li></li>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <HelloWorld msg="United States Presidential Approval Ratings" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      items: [
        {
          src: "https://trumpwhitehouse.archives.gov/wp-content/uploads/2017/12/P20170820KR-0044-1920x720.jpg",
        },
        {
          src: "https://obamawhitehouse.archives.gov/sites/whitehouse.gov/files/images/1600/Presidents/Four_Presidents.jpg",
        },
        {
          src: "https://api.time.com/wp-content/uploads/2018/02/president-abraham-lincoln-george-washington-chester-arthur-1.jpg",
        },
        {
          src: "https://theintercept.imgix.net/wp-uploads/sites/1/2018/02/president-day-1518819254.jpg?auto=compress%2Cformat&q=90&fit=crop&w=1440&h=720",
        },
        {
          src: "https://previews.123rf.com/images/figura13/figura131309/figura13130900016/22875721-background-image-with-money-and-u-s-presidents.jpg",
        },
      ],
    };
  },
};
</script>
