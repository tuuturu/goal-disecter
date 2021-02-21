<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "src/assets/theme";

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;

  background: $primary-background-color;

  color: $primary-text-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
