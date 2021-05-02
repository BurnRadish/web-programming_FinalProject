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
            <p
              v-if="error"
              class="alert alert-danger"
            >
              {{ error }}
            </p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              ><strong>Email</strong></label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
              :class="{ 'is-invalid': $v.email.$error }"
            />
            <template v-if="$v.email.$error == true">
                      <p class="help is-danger" v-if="!$v.email.required">Please enter email</p>
                      <p class="help is-danger" v-if="!$v.email.email">wrong email format</p>
            </template>
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
              :class="{ 'is-invalid': $v.password.$error }"
            />
            <template v-if="$v.password.$error == true">
                      <p class="help is-danger" v-if="!$v.password.required">Please enter password</p>
            </template>
          </div>
          <button
            v-on:click="submit()"
            type="submit"
            class="btn btn-primary w-100"
          >
            Submit
          </button>
          <!--</form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: null,
      password: null,
      error: "",
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if(this.$v.$invalid == false){
          const data = {
            email: this.email,
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
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    password: {
      required: required,
    },
  },
};
</script>

<style scoped></style>
