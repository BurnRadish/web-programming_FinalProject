<template>
<div class="container">
    <navbar/>
    <h1 class="title has-text-centered">INVENTORY</h1>
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
        <!-- footer -->
        <tfoot>
            <tr>
                <th>ลำดับ</th>
                <th>ชื่อรายการสินค้า</th>
                <th>ประเภท</th>
                <th>ยี่ห้อ</th>
                <th>จำนวน</th>
            </tr>
        </tfoot>
        <!-- End footer table -->
        <!-- table body -->
        <tbody v-for="(product, index) in blog" v-bind:key="product.id">
            <tr>
                <td><a>{{ index + 1}}</a></td>
                <td><a>{{ product.title }}</a></td>
                <td>{{ product.type}}</td>
                <td><a>{{product.brand}}</a></td>
                <td>{{product.amount}}</td>
            </tr> 
        </tbody>
        <!-- End tbody -->
    </table>
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
      }
  },
  components: {
    navbar,
  }
};
</script>