<template>
   <div class="container">
    <navbar />
    <h1 class="title" style="margin-top: 2%">ค้นหาพนักานที่คุณต้องการ</h1>
    <form class="box" style="padding-top: 3%">
      <div class="field">
        <label class="label">ชื่อพนักงาน</label>
        <div class="control">
          <input class="input" type="email" placeholder="Sompong Chobhee" />
        </div>
      </div>
      <button class="button is-primary is-rounded">Find</button>
    </form>
    <u><h1 class="title has-text-centered">รายชื่อพนักงาน</h1></u>
    <div class="columns" style="padding-top: 5%">
      <div class="column is-3">
        <div class="card">
          <div class="card-image">
            <img src="https://bulma.io/images/placeholders/1280x960.png" />
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">John Lenon</p>
              <p>- Data Engineer</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" v-on:click="check = !check">Profile</a>
          </footer>
        </div>
      </div>
      <div class="column is-3">
        <div class="card">
          <div class="card-image">
            <img src="https://bulma.io/images/placeholders/1280x960.png" />
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">Sithipap Ploywong</p>
              <p>- Database Adminstator</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Profile</a>
          </footer>
        </div>
      </div>
      <div class="column is-3">
        <div class="card">
          <div class="card-image">
            <img src="https://bulma.io/images/placeholders/1280x960.png" />
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">Sirapop Ploywong</p>
              <p>- Sale Engineer</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Profile</a>
          </footer>
        </div>
      </div>
      <div class="column is-3">
        <div class="card">
          <div class="card-image">
            <img src="https://bulma.io/images/placeholders/1280x960.png" />
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">John Lenon</p>
              <p>- Software Engineer</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Profile</a>
          </footer>
        </div>
      </div>
    </div>
    <!--Modal-->
    <div class="modal" v-bind:class="{'is-active': check}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" v-on:click="check = !check">Cancel</button>
        </footer>
      </div>
    </div>
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

<style></style>
