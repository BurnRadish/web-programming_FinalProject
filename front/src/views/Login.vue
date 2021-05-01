<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div
        class="card shadow-lg bg-white rounded"
        style="margin: 25%; width: 30%"
      >
        <div class="card-body">
          <!--<form>-->
            <div>
              <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">
                {{ error }}
              </p>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                ><strong>Username</strong></label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                ><strong>Password</strong></label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
              />
            </div>
            <button v-on:click="submit()" type="submit" class="btn btn-primary w-100">Submit</button>
          <!--</form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: null,
      password: null,
      error:''
    };
  },
  methods: {
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped></style>
