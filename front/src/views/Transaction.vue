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
            <a class="button is-primary" @click="newTran = true">
              + เพิ่มรายการธุรกรรม
            </a>
          </div>
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="ค้นหาประวัติธุรกรรม" v-model="searchT">
          </div>
          <div class="control">
            <a class="button is-info" @click="searchTran()">
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
                <th>พนักงานผู้ดูแลธุรกรรม</th>
            </tr>
        </thead>
        <!-- End header -->
        <!-- footer -->
        <tfoot>

        </tfoot>
        <!-- End footer table -->
        <!-- table body -->
        <tbody>
            <tr v-for='(tran) in trans' :key='tran.tran_id' v-on:click="editTran(tran.tran_id)">
              <td><a>#{{tran.tran_id}}</a></td>
              <td>{{tran.type}}</td>
              <td>{{tran.transaction_date}}</td>
              <td>{{tran.payment_method}}</td>
              <td>{{tran.payment_status}}</td>
              <td>{{tran.credit}}</td>
              <td>{{tran.fname}} {{tran.lname}} </td>
            </tr>
        </tbody>
        <!-- End tbody -->
    </table>
    <br>
    <progress class="progress is-small is-info" value='100' max="100"></progress>

    <!-- Tran modal --> <!-- for creat new transaction -->
    <div class="modal" v-bind:class="{ 'is-active': newTran }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">เพิ่มรายการประวัติธุรกรรม</p>
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
            <div class="column is-8"> 
              <label for="" class="label">วันที่ดำเนินธุรกรรม : 
                <input type="date" style="margin-left: 15px;" v-model="transaction_date">
              </label>
            </div>
          </div>
          <!-- End first column -->
          <div class="columns">
            <label class="label">ชื่อสินค้า</label>
            <input type="text" v-model="title">
          </div>
          <!-- second colum -->
          <div class="columns">
            <!-- Select method -->
            <div class="column is-4">
              <label class="label">วิธีการชำระเงิน</label>
              <!-- ENUM('Cash', 'Cheque', 'Creditcard') -->
              <select v-model="payament_method">
                <option disabled value="วิธีการชำระเงิน" selected>วิธีการชำระเงิน</option>
                <option value="Cheque">Cheque</option>
                <option value="Creditcard">Creditcard</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div class="column is-4"> 
              <label for="" class="label">วันครบกำหนดชำระ 
                <input type="date" v-model="credit_due_date">
              </label>
            </div>
          </div>
          <!-- End second column -->
          <!-- column 3 -->
          <div class="columns">
            <div class="column is-4"> <!-- payment status -->
              <label for=""><b>สถานะการชำระ</b></label>
              <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input type="radio" name="" v-model="payament_status" value="Complete">
                    ชำระครบถ้วน
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input type="radio" name="" v-model="payament_status" value="Incomplete" >
                    ยังชำระไม่ครบ
                  </label>
                </div>
            </div>
            <!-- trigger if Incomplete -->
            <div class="column is-4" v-show="payament_status == 'Incomplete' "> 
              <label for="">ยอดค้างการชำระ</label>
              <input type="number" v-model="credit"><br>
            </div>
          </div>
          <!-- End column 3 -->
          <!-- column 4 -->
          <div class="columns">
            <div class="column is-4"> <!-- deliverly status -->
              <label for=""><b>สถานะการจัดส่ง</b></label>
              <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input type="radio" name="" v-model="delivery_status" value="1">
                    จัดส่งสำเร็จ
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input type="radio" name="" v-model="delivery_status" value="0" >
                    ยังไม่ได้ทำการจัดส่ง
                  </label>
                </div>
            </div>
            <div class="column is-4"> 
              <label for="" class="label">วันที่จัดส่งสินค้า
                <input type="date" v-model="delivery_date">
              </label>
            </div>
          </div>
          <!-- End column 4 -->
          <!-- colum 5 -->
          <div class="columns">
            <div class="field column is-4">
              <label class="label">รหัสพนักงานผู้ดำเนินการ</label>
              <div class="control">
                <input class="input" type="number" placeholder="" v-model="employee_emp_id">
              </div>
            </div>
            <div class="field column is-4">
              <label class="label">รหัสคู่ค้าที่ทำธุรกรรม</label>
              <div class="control">
                <input class="input" type="number" placeholder="" v-model="partner_par_id">
              </div>
            </div>
          </div>
          <!-- End column 5  -->
        </section>
        <!--End comtent Body -->
        <footer class="modal-card-foot columns">
            <div class="column is-6">
              <button class="button is-info is-fullwidth" @click="creatTran()">เพิ่ม</button>
            </div>
            <div class="column is-6">
              <button class="button is-fullwidth is-danger" @click="newTran = false">ยกเลิก</button>
            </div>
        </footer>
      </div>
    </div>
    <!-- End Model -->
    <!-- model for edit tran --> 
        <div class="modal" v-bind:class="{ 'is-active': editModel }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">แก้ไขข้อมูลธุรกรรม</p>
          <button class="delete" aria-label="close" @click="editModel = false"></button>
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
                        <input type="radio" name="member" v-model="edit_type" value="PURCHASE">
                        ซื้อ
                      </label>
                      <label class="radio">
                        <input type="radio" name="member" v-model="edit_type" value="SALE">
                        ขาย
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-8"> 
              <label for="" class="label">วันที่ดำเนินธุรกรรม : 
                <input type="date" style="margin-left: 15px;" v-model="edit_transaction_date">
              </label>
            </div>
          </div>
          <!-- End first column -->

          <!-- second colum -->
          <div class="columns">
            <!-- Select method -->
            <div class="column is-4">
              <label class="label">วิธีการชำระเงิน</label>
              <select v-model="edit_payament_method">
                <option disabled value="วิธีการชำระเงิน" selected>วิธีการชำระเงิน</option>
                <option value="Cheque">Cheque</option>
                <option value="Creditcard">Creditcard</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div class="column is-4"> 
              <label for="" class="label">วันครบกำหนดชำระ 
                <input type="date" v-model="edit_credit_due_date">
              </label>
            </div>
          </div>
          <!-- End second column -->
          <!-- column 3 -->
          <div class="columns">
            <div class="column is-4"> <!-- payment status -->
              <label for=""><b>สถานะการชำระ</b></label>
              <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input type="radio" name="" v-model="edit_payament_status" value="Complete">
                    ชำระครบถ้วน
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input type="radio" name="" v-model="edit_payament_status" value="Incomplete" >
                    ยังชำระไม่ครบ
                  </label>
                </div>
            </div>
            <!-- trigger if Incomplete -->
            <div class="column is-4" v-show="payament_status == 'Incomplete' "> 
              <label for="">ยอดค้างการชำระ</label>
              <input type="number" v-model="edit_credit"><br>
            </div>
          </div>
          <!-- End column 3 -->
          <!-- column 4 -->
          <div class="columns">
            <div class="column is-4"> <!-- deliverly status -->
              <label for=""><b>สถานะการจัดส่ง</b></label>
              <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input type="radio" name="" v-model="edit_delivery_status" value="1">
                    จัดส่งสำเร็จ
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input type="radio" name="" v-model="edit_delivery_status" value="0" >
                    ยังไม่ได้ทำการจัดส่ง
                  </label>
                </div>
            </div>
            <div class="column is-4"> 
              <label for="" class="label">วันที่จัดส่งสินค้า
                <input type="date" v-model="edit_delivery_date">
              </label>
            </div>
          </div>
          <!-- End column 4 -->
          <!-- colum 5 -->
          <div class="columns">
            <div class="field column is-4">
              <label class="label">รหัสพนักงานผู้ดำเนินการ</label>
              <div class="control">
                <input class="input" type="number" placeholder="" v-model="edit_employee_emp_id">
              </div>
            </div>
            <div class="field column is-4">
              <label class="label">รหัสคู่ค้าที่ทำธุรกรรม</label>
              <div class="control">
                <input class="input" type="number" placeholder="" v-model="edit_partner_par_id">
              </div>
            </div>
          </div>
          <!-- End column 5  -->
        </section>
        <!--End comtent Body -->
        <footer class="modal-card-foot columns">
            <div class="column is-6">
              <button class="button is-success is-fullwidth" @click="saveEdit()">บันทึก</button>
            </div>
            <div class="column is-6">
              <button class="button is-fullwidth is-danger" @click="newTran = false">ยกเลิก</button>
            </div>
        </footer>
      </div>
    </div>
    <!-- End edit tran model -->
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
        searchT: '',
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
        count: 1,
        price: 10000,
        title: '',
        /* Ene Trans ins */
        
        /* for tran edit */
        editModel: false,
        edit_delivery_date: '',
        edit_credit: 0,
        edit_payament_method: '',
        edit_payament_status: '',
        edit_credit_due_date: '',
        edit_transaction_date: '',
        edit_delivery_status: '',
        edit_type: '',
        edit_employee_emp_id: 0,
        edit_partner_par_id: 0,
        /* end tran edit */
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
          delivery_status: parseInt(this.delivery_status),
          type: this.type,
          employee_emp_id: this.employee_emp_id,
          partner_par_id: this.partner_par_id,
          count: this.count,
          price: this.price,
          title: this.title,
        }
        console.log(tranData)
        /* Request axios */
        axios
        .put("http://localhost:3000/trans", tranData)
        .then((response => {
          console.log("response: ", response)
          console.log("Success")
        }))
        .catch(err => {
          console.log(err)
        })
        /* reset */
        this.newTran = false
        this.delivery_date = '',
        this.credit = 0,
        this.payament_method = '',
        this.payament_status = '',
        this.credit_due_date = '',
        this.transaction_date = '',
        this.delivery_status = '',
        this.type = '',
        this.employee_emp_id = 0,
        this.partner_par_id = 0,
        this.count = 0,
        this.price = 0,
        this.title = ''
      },
      editTran(id){
        this.editModel = true;

        //fine id
        function findEdit(val){
          return val.tran_id == id
        }

        let selectedEdit = this.trans.filter(findEdit)[0]
        console.log(selectedEdit)
        this.edit_delivery_date = selectedEdit.delivery_date
        this.edit_credit = selectedEdit.credit
        this.edit_payament_method = selectedEdit.payment_method
        this.edit_payament_status = selectedEdit.payment_status
        this.edit_credit_due_date = selectedEdit.credit_due_date
        this.edit_transaction_date = selectedEdit.transaction_date
        this.edit_delivery_status = selectedEdit.delivery_status
        this.edit_type = selectedEdit.type
        this.edit_employee_emp_id = selectedEdit.employee_emp_id
        this.edit_partner_par_id = selectedEdit.partner_par_id
      },
      saveEdit(){
        //set up data
        /* let updateData ={
           delivery_date: this.edit_delivery_date,
          credit: this.edit_credit,
          payament_method: this.edit_payament_method,
          payament_status: this.edit_payament_status,
          credit_due_date: this.edit_credit_due_date,
          transaction_date: this.edit_transaction_date,
          delivery_status: parseInt(this.edit_delivery_status),
          type: this.edit_type,
          employee_emp_id: this.edit_employee_emp_id,
          partner_par_id: this.edit_partner_par_id,
        } */
      },
      searchTran(){
        axios
        .get("http://localhost:3000/trans", 
        { params: {
          search : this.searchT
        }})
        .then((response) => {
          this.trans = response.data;
          console.log(response.data)
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