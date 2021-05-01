<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ">
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
    <div id="navbarBasicExample" class="navbar-menu ">
      <div class="navbar-start">
        <a class="navbar-item" href="/employees">
          Employees
        </a>
        <a class="navbar-item" href="/partners">
          Partner
        </a>
        <a class="navbar-item" href="/inventory">
          Inventory
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item navbar-end has-dropdown is-hoverable">
          <a class="navbar-link">
            {{user.fname}} {{user.lname}}
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              Profile
            </a>
            <a v-on:click="logout()" class="navbar-item">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data(){
    return{
      user: null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push({ path: "/" });
    },
    onAuthChange (){
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      axios.get('/user/me').then(res => {
        this.user = res.data
      })
    }
  },
  mounted(){
    this.onAuthChange()
  }
};
</script>

<style></style>
