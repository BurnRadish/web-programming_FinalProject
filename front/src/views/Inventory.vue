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
            <a class="button is-primary" @click="newInven = !newInven">
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
    <!-- Tran modal -->
    <div class="modal" v-bind:class="{ 'is-active': newInven }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">เพิ่มสินค้า</p>
          <button class="delete" aria-label="close" @click="newInven = false"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="columns">
            <!-- first column -->
            <div class="column is-4">
              <div class="field is-horizontal">
                <div class="field-label">
                  <label class="label">ประเภท</label>
                </div>
                <div class="field-body" >
                  <div class="field is-narrow">
                    <div class="control">
                      <label class="radio">
                        <input type="radio" name="member" v-model="type" value="MACHINE">
                        เครื่องจักร
                      </label>
                      <label class="radio" style="margin-left: 0px;">
                        <input type="radio" name="member" v-model="type" value="SPARE_PART" >
                        อะไหล่
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-8"> 
              <label for="" class="label">
                ชื่อสินค้า 
                <input type="text" class="input" v-model="title">
              </label>
            </div>
          </div>
          <!-- End first column -->

          <!-- second colum -->
          <div class="columns">
            <!-- Select method -->
            <div class="column is-8"> 
              <label for="" class="label">
                ชื่อยี่ห้อสินค้า 
                <input type="text" class="input" v-model="brand">
              </label>
            </div>
            <div class="column is-4"> 
              <label for="" class="label">ระยะเวลารับประกัน 
                <input type="date" v-model="mfd">
              </label>
            </div>
          </div>
          <!-- End second column -->
        </section>
        <!--End comtent Body -->
        <footer class="modal-card-foot columns">
            <div class="column is-6">
              <button class="button is-info is-fullwidth" @click="createInven()">เพิ่ม</button>
            </div>
            <div class="column is-6">
              <button class="button is-fullwidth is-danger" @click="newInven = false">ยกเลิก</button>
            </div>
        </footer>
      </div>
    </div>
    <!-- End Model -->
</div>
</template>

<script>
import axios from "axios";
import navbar from "../components/Navbar.vue";
export default {
  data() {
    return {
        check: false,
        blog : [],
        newInven: false,
        /* inven ins */
        type: '',
        title: '',
        brand: '',
        mfd: '',
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
      createInven(){
        /* set up data */
        let productData = {
          type : this.type,
          mfd : this.mfd,
          brand : this.brand,
          title : this.title
        }
        console.log(productData)

        axios
        .put("http://localhost:3000/products", productData)
        .then((response => {
          console.log("response: ", response)
          console.log("Success")
        }))
        .catch(err => {
          console.log(err)
        })


      }
  },
  components: {
    navbar,
  }
};
</script>