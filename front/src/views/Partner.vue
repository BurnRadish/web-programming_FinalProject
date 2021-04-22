<template>
   <div class="container">
    <navbar />
    <h1 class="title" style="margin-top: 2%; display: inline">ค้นหาพาร์ทเนอร์ที่คุณต้องการ</h1>
    <button
      class="button is-warning"
      style="float:right"
      v-on:click="checkadd = !checkadd"
    >
      +Add New Employee
    </button>
    <form class="box mt-3 pt-2">
      <div class="field">
        <label class="label">ชื่อพาร์ทเนอร์</label>
        <div class="control">
          <input class="input" type="email" placeholder="Sompong Chobhee" />
        </div>
      </div>
      <button class="button is-primary is-rounded">Find</button>
    </form>
    <u><h1 class="title has-text-centered">รายชื่อพาร์ทเนอร์</h1></u>
    <div class="columns is-multiline" style="padding-top: 5%">
      <div class="column is-3" v-for="par in blog" :key="par.id">
        <div class="card">
          <div class="card-image">
            <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" />
          </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">{{par.par_fname}} {{par.par_lname}}</p>
              <p>- {{par.company_name}}</p>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" v-on:click="par.check = !par.check">Profile</a>
            <a class="card-footer-item" v-on:click="par.checkedit = !par.checkedit">Edit</a>
          </footer>
        </div>
      </div>
    </div>
    <button class="button is-warning is-rounded" v-on:click="checkadd = !checkadd">+Add New Partner</button>
    <!--Modal with v-for-->
    <div class="modal" v-for="mo in blog" :key="mo.id" v-bind:class="{'is-active': mo.check}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="container">
                <div class="columns">
                  <div class="column is-6">
                    <img
                      src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                    />
                  </div>
                  <div class="column is-6">
                    <u><h3 class="title is-4">Profile</h3></u>
                    <div class="content" style="padding-top: 3%">
                      <h4>{{mo.company_name}}</h4>
                      <p>Name : {{mo.par_fname}} {{mo.par_lname}}</p>
                      <p>Tel : {{mo.phone1}}</p>
                      <p>Email : {{mo.email1}}</p>
                    </div>
                  </div>
                </div>
              </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" v-on:click="mo.check = !mo.check">Cancel</button>
        </footer>
      </div>
    </div>
    <!--Modal For Edit-->
    <div class="modal" v-for="mod in blog" :key="mod.id" v-bind:class="{ 'is-active': mod.checkedit }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">Surname</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <div class="field">
                  <label class="label">Gender</label>
                </div>
                <div class="select">
                  <select>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div class="column is-4">
                <div class="field">
                  <label class="label">Birth</label>
                </div>
                <input class="input" type="date" />
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Position</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Data Engineer"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="aaa@aaa.com"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Address</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Bangkok Mailbox 10200"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tel.</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="0800000000" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" v-on:click="mod.checkedit = !mod.checkedit">
            Cancel
          </button>
        </footer>
      </div>
    </div>
    <!--Modal For Add Partner-->
    <div class="modal" v-bind:class="{'is-active': checkadd}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="field">
                  <label class="label">Surname</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Text input" />
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <div class="field">
                  <label class="label">Gender</label>
                </div>
                <div class="select">
                  <select>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div class="column is-4">
                <div class="field">
                  <label class="label">Birth</label>
                </div>
                <input class="input" type="date">
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="field">
                  <label class="label">Position</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Data Engineer"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="aaa@aaa.com"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Address</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Bangkok Mailbox 10200"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Tel.</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="0800000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button" v-on:click="checkadd = !checkadd">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar.vue";
import axios from "axios"
export default {
  data() {
    return {
        check: false,
        checkadd: false,
        blog:{}
    };
  },
  components: {
    navbar,
  },
  created(){
    axios.get("http://localhost:3000/partner")
    .then((response) =>{
      for(let i of response.data.blogs){
        i.check = false;
        i.checkedit = false;
      }
      this.blog = response.data.blogs
      console.log(this.blog);
    })
  }
};
</script>

<style></style>
