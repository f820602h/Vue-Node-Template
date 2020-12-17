<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="font-weight-bold">Home</router-link> |
      <router-link to="/about" class="font-weight-bold">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  position: relative;
  font-size: 14px !important;
  line-height: 20px !important;
  color: $gray-900 !important;
}

#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
