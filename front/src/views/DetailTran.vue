<template>
  <div class="container">
    <navbar />
    <div class="notification">
      <h1 class="title has-text-centered is-2">รายละเอียดธุรกรรมหมายเลข {{detail.tran_id}}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getTranDetail(this.$route.params.id);
  },
  methods: {
    getTranDetail(blogId) {
      axios
        .get(`http://localhost:3000/trans/${blogId}`)
        .then((response) => {
          console.log(response.data);
          //change date form
          response.data[0].transaction_date = response.data[0].transaction_date.substring(0,response.data[0].transaction_date.indexOf('T'))
          response.data[0].credit_due_date = response.data[0].credit_due_date.substring(0,response.data[0].credit_due_date.indexOf('T'))
          response.data[0].delivery_date = response.data[0].delivery_date.substring(0,response.data[0].delivery_date.indexOf('T'))

          this.detail = response.data[0];
          console.log(this.detail)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    navbar,
  },
};
</script>
