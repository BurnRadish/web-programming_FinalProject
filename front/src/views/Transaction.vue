<template>
  <div class="container">
    <navbar/>
    <h1 class="title has-text-centered is-1">TRANSACTION</h1><br>

    <div class="notification">
      <h1 class="title has-text-centered is-2">ประวัติการดำเนินธุรกรรม</h1>
    </div>

    <!-- button -->
    <div class="columns">
      <div class='column'>
        <div class="field has-addons">
          <div class="control">
            <a class="button is-primary" @click="newTran = !newTran">
              + เพิ่มรายการธุรกรรม
            </a>
          </div>
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="ค้นหาประวัติธุรกรรม">
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
              <td><a>#{{tran.tran_id}}</a></td>
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

    <!-- Tran modal -->
    <div class="modal" v-bind:class="{ 'is-active': newTran }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มประวัติธุรกรรม</p>
          <button class="delete" aria-label="close" @click="newTran = false"></button>
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
                        <input type="radio" name="member" v-model="type" value="PURCHASE">
                        ซื้อ
                      </label>
                      <label class="radio">
                        <input type="radio" name="member" v-model="type" value="SALE">
                        ขาย
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- second colum -->
            <div class="column is-8"> 
              <label for="" class="label">วันที่ดำเนินธุรกรรม : 
                <input type="date" style="margin-left: 15px;" v-model="transaction_date">
              </label>
            </div>
          </div>
          <!-- End first column -->
          <div class="columns">
            <!-- Select method -->
            <div class="column is-3">
              <label class="label">วิธีการชำระเงิน</label>
              <select v-model="payament_method">
                <option disabled value="วิธีการชำระเงิน" selected>วิธีการชำระเงิน</option>
                <option value="Cheque">Cheque</option>
                <option value="Creditcard">Creditcard</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <!--End Select -->
            <div class="column is-4">
              <label for="" style="margin-left: 15px;"><b>สถานะการชำระ</b></label>
              <div class="control">
                  <label class="radio">
                    <input type="radio" name="" v-model="payament_status" value="Complete">
                    ชำระครบถ้วน
                  </label>
                  <label class="radio">
                    <input type="radio" name="" v-model="payament_status" value="Incomplete">
                    ยังชำระไม่ครบ
                  </label>
                </div>
            </div>
            <!-- trigger if Incomplete -->
            <div class="column is-4" v-show="payament_status == 'Incomplete' "> 
              <label for="" style="margin-left: 15px;">ยอดค้างการชำระ</label>
              <input type="number" style="margin-left: 15px;" v-model="credit"><br>
            </div>
          </div>
          

          

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
        product: [],
        /* trans ins */
        delivery_date: '',
        credit: 0,
        payament_method: '',
        payament_status: '',
        credit_due_date: '',
        transaction_date: '',
        delivery_status: '',
        type: '',
        employee_emp_id: 0,
        partner_par_id: 0,
        /* Ene Trans ins */
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
      },
      /*  creat Tran here  */
      creatTran(){
        /* set up data */
        let tranData = {
          delivery_date: this.delivery_date,
          credit: this.credit,
          payament_method: this.payament_method,
          payament_status: this.payament_status,
          credit_due_date: this.credit_due_date,
          transaction_date: this.transaction_date,
          delivery_status: this.delivery_status,
          type: this.type,
          employee_emp_id: this.employee_emp_id,
          partner_par_id: this.partner_par_id,
        }
        /* Request axios */
        axios
        .put("http://localhost:3000/trans", tranData)
      }
  },
  components: {
    navbar,
  },
};
</script>