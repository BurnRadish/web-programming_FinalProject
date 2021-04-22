<template>
<div class="container">
    <navbar/>
    <h1 class="title has-text-centered">INVENTORY</h1>
    <div class="notification">
      <h1 class="title has-text-centered is-2">คลังสินค้า</h1>
    </div>
    <!-- button -->
    <div class="columns">
      <div class='column'>
        <div class="field has-addons">
          <div class="control">
            <a class="button is-primary" @click="newTran = !newTran">
              + เพิ่มรายการสินค้าลงคลัง
            </a>
          </div>
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="ค้นหาสินค้า">
          </div>
          <div class="control">
            <a class="button is-info">
              ค้นหา
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--End button -->
    <!-- table products -->
    <table class="table is-hoverable">
        <!-- header -->
        <thead>
            <tr>
                <th>ลำดับ</th>
                <th>ชื่อรายการสินค้า</th>
                <th>ประเภท</th>
                <th>ยี่ห้อ</th>
                <th>จำนวน</th>
            </tr>
        </thead>
        <!-- End header -->
        <!-- table body -->
        <tbody v-for="(product, index) in blog" v-bind:key="product.id">
            <tr>
                <td><b><a>{{ index + 1}}</a></b></td>
                <td><a>{{ product.title }}</a></td>
                <td>{{ product.type}}</td>
                <td><a>{{product.brand}}</a></td>
                <td>{{product.amount}}</td>
            </tr> 
        </tbody>
        <!-- End tbody -->
    </table>
    <!-- End table -->
</div>
</template>

<script>
import axios from "axios";
import navbar from "../components/Navbar.vue";
export default {
  data() {
    return {
        check: false,
        blog : []
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
      getProduct(){
        axios
        .get("http://localhost:3000/products", {
        })
        .then((response) => {
          this.blog = response.data;
          console.log(response.data)
          console.log(this.blog)
        })
        .catch((err) => {
          console.log(err);
        });
      },
  },
  components: {
    navbar,
  }
};
</script>