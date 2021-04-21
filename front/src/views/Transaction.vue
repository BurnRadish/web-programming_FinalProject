<template>
<div class="container">
    <navbar/>
    <h1 class="title has-text-centered is-1">TRANSACTION</h1><br>

    <div class="notification">
      <h1 class="title has-text-centered is-2">ประวัติการซื้อ</h1>
    </div>
    
    <table class="table is-hoverable is-bordered">
        <!-- header -->
        <thead class="has-text-centered">
            <tr>
                <th>ลำดับ</th>
                <th>หมายเลขธุรกรรม</th>
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
            <tr>
              <th>1</th>
              <th>11</th>
              <th>2019-01-18</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>11</th>
              <th>2019-01-18</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>11</th>
              <th>2019-01-18</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>11</th>
              <th>2019-01-18</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>11</th>
              <th>2019-01-18</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
        </tbody>
        <!-- End tbody -->
    </table>
    <br>
    <progress class="progress is-small is-info" value='100' max="100"></progress>
    <div class="notification">
      <h1 class="title has-text-centered is-2">ประวัติการขาย</h1>
    </div>
    
    <table class="table is-hoverable is-bordered">
        <!-- header -->
        <thead class="has-text-centered">
            <tr>
                <th>ลำดับ</th>
                <th>หมายเลขธุรกรรม</th>
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
            <tr>
              <th>1</th>
              <th>1</th>
              <th>2021-02-26</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>1</th>
              <th>2021-02-26</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>1</th>
              <th>2021-02-26</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
            <tr>
              <th>1</th>
              <th>1</th>
              <th>2021-02-26</th>
              <th>Cheque</th>
              <th>Complete</th>
              <th>0</th>
            </tr>
        </tbody>
        <!-- End tbody -->
    </table>
</div>
</template>

<script>
import navbar from "../components/Navbar.vue";
export default {
  data() {
    return {
        check: false
    };
  },
  components: {
    navbar,
  },
};
</script>