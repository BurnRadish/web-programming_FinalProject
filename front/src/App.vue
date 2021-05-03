<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
body {
  background-image: linear-gradient(rgb(255, 255, 255), rgb(119, 167, 255));
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
