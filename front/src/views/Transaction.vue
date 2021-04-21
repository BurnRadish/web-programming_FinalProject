<template>
  <div class="container">
    <navbar/>
    <h1 class="title has-text-centered is-1">TRANSACTION</h1><br>

    <div class="notification">
      <h1 class="title has-text-centered is-2">ประวัติการดำเนินธุรกรรม</h1>
    </div>

    <!-- button -->
    <label class="label">ค้นหารายการ</label>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="หาอะไรใส่ไรดี">
      </div>
      <div class="control">
        <a class="button is-info">
          ค้นหา
        </a>
      </div>
    </div>
    <!--End button -->

    <table class="table is-hoverable is-bordered">
        <!-- header -->
        <thead class="has-text-centered">
            <tr>
                <th>หมายเลขธุรกรรม</th>
                <th>ประเภทธุรกรรม</th>
                <th>วันที่ดำเนินธุรกรรม</th>
                <th>วิธีการชำระเงิน</th>
                <th>สถานะการชำระ</th>
                <th>ยอดค้างการชำระ</th>
            </tr>
        </thead>
        <!-- End header -->
        <!-- footer -->
        <tfoot>

        </tfoot>
        <!-- End footer table -->
        <!-- table body -->
        <tbody>
            <tr v-for='(tran) in trans' :key='tran.tran_id'>
              <td>{{tran.tran_id}}</td>
              <td>{{tran.type}}</td>
              <td>{{tran.transaction_date}}</td>
              <td>{{tran.payment_method}}</td>
              <td>{{tran.payment_status}}</td>
              <td>{{tran.credit}}</td>
            </tr>
        </tbody>
        <!-- End tbody -->
    </table>
    <br>
    <progress class="progress is-small is-info" value='100' max="100"></progress>
    <button class="button is-info is-large" @click="newTran = !newTran">+ เพิ่มรายการธุรกรรม</button>
    <!-- Tran model -->
    <div class="modal" v-bind:class="{ 'is-active': newTran }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มประวัติธุรกรรม</p>
          <button class="delete" aria-label="close" @click="newTran = false"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">ประเภท</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="member">
                    ซื้อ
                  </label>
                  <label class="radio">
                    <input type="radio" name="member">
                    ขาย
                  </label>
                </div>
              </div>
              <label for="" class="label">วันที่ดำเนินธุรกรรม</label> <br>
              <input type="date" style="margin-left: 15px;">
            </div>
          </div>
          <!-- Dropdown -->
          <div class="dropdown" v-bind:class="{ 'is-active': selectMethod }" @click="selectMethod = !selectMethod">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>วิธีการชำระเงิน</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Cheque
                </a>
                <a class="dropdown-item">
                  Cash
                </a>
                <a href="#" class="dropdown-item">
                  Credit card
                </a>
              </div>
            </div>
          </div>
          <!--End dropdown -->
          <label for="" style="margin-left: 15px;">ยอดค้างการชำระ</label>
          <input type="number" style="margin-left: 15px;">

          <div class="field">
            <label class="label">พนักงานผู้ดำเนินการ</label>
            <div class="control">
              <input class="input" type="text" placeholder="">
            </div>
          </div>
        </section>
        <!--End comtent Body -->
        <footer class="modal-card-foot">
          <button class="button is-info">เพิ่ม</button>
          <button class="button is danger" @click="newTran = false">ยกเลิก</button>
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
        newTran: false,
        selectMethod: false,
        trans: [],
        emp: [],
        product: []
    };
  },
  mounted() {
    this.getTrans();
  },
  methods: {
      getTrans(){
        axios
        .get("http://localhost:3000/trans", {

        })
        .then((response) => {
          this.trans = response.data;
          console.log(response.data)
          console.log(this.trans)
        })
        .catch((err) => {
          console.log(err);
        });
      }
  },
  components: {
    navbar,
  },
};
</script>