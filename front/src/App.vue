<template>
  <div id="app">
    <!--<router-view :key="$route.fullPath" />-->
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      //const token = localStorage.getItem("token");
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
  },
};
</script>
