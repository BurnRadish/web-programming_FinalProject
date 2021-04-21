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
            </tr>
        </tfoot>
        <!-- End footer table -->
        <!-- table body -->
        <tbody>
            <tr>
                <td>1</td>
                <td>เครื่องตัดไม้ OPTIMIZING CUT OFF SIMPLE</td>
                <td>เครื่องจักร</td>
                <td>CARPENTER</td>
            </tr>
            <tr>
                <td>2</td>
                <td>เครื่องตัดไม้ OPTIMIZING CUT OFF SIMPLE</td>
                <td>เครื่องจักร</td>
                <td>CARPENTER</td>
            </tr>
            <tr>
                <td>3</td>
                <td>เครื่องตัดไม้ OPTIMIZING CUT OFF SIMPLE</td>
                <td>เครื่องจักร</td>
                <td>CARPENTER</td>
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