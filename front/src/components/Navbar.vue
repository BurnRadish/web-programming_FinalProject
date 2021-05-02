<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/home">
        <img src="../assets/WAP_LOGO.png" width="53" height="52" class="pr-3" />
        WAP MACHINERY
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/employees"> Employees </a>
        <a class="navbar-item" href="/partners"> Partner </a>
        <a class="navbar-item" href="/inventory"> Inventory </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item navbar-end has-dropdown is-hoverable">
          <a class="navbar-link"> {{ user.fname }} {{ user.lname }} </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="modal = true"> Change password </a>
            <a v-on:click="logout()" class="navbar-item"> Logout </a>
          </div>
        </div>
      </div>
    </div>

    <!-- modal-->
    <div class="modal" v-bind:class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Change password</p>
          <button class="delete" aria-label="close" @click="modal = false"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div>
              <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">
                {{ error }}
              </p>
          </div>
          <label ><strong><p>Old password</p></strong></label>
          <input class="input" type="text" placeholder="Text input" v-model='oldPass'>
          <label class="mt-3"><strong><p>New password</p></strong></label>
          <input class="input" type="text" placeholder="Text input" v-model="newPass">
          <label class="mt-3"><strong><p>Confirm new password</p></strong></label>
          <input class="input" type="text" placeholder="Text input" v-model="conPass">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="submit">Save changes</button>
          <button class="button" @click="modal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      user: null,
      modal: false,
      oldPass: '',
      newPass: '',
      conPass: '',
      error:''
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push({ path: "/" });
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
    submit(){
      let body = {
        oldPass: this.oldPass,
        newPass: this.newPass,
        conPass: this.conPass,
        id:  this.user.emp_id
      }
      axios.put('/employees/'+ this.user.emp_id + '/password', body)
      .then((res) => {
        console.log(res.data)
        this.oldPass = ''
        this.newPass = ''
        this.conPass = ''
        this.error = ''
        this.logout()
      })
      .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    }
  },
  mounted() {
    this.onAuthChange();
  },
};
</script>

<style></style>
