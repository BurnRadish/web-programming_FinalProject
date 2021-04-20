<template>
  <div class="container">
    <div class='d-flex justify-content-center'>
      <div class="card shadow-lg bg-white rounded" style="margin: 25%; width: 30%">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"><strong>Email</strong></label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
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
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

};
</script>

<style scoped>
</style>