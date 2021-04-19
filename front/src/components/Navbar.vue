<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="../assets/WAP_LOGO.png" width="53" height="52" class='pr-3'>
      WAP MACHINERY
    </a>
    
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">

      <a class="navbar-item">
        Employees
      </a>

      <a class="navbar-item">
        Partner
      </a>

      <a class="navbar-item">
        Inventory
      </a>
      </div>
    <div class='navbar-end'>
      <div class="navbar-item navbar-end has-dropdown is-hoverable" >
        <a class="navbar-link">
          Setting
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Profile
          </a>
          <a class="navbar-item">
            Logout
          </a>
        </div>
      </div>
    </div>
    
  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>