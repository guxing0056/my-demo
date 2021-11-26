<template>
  <div id="app">
    <div id="nav">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  background-color: #091830;
}
body {
  background-color: #091830;
}
.container {
  padding-bottom: 100px;
  padding-top: 20px;
}
.disabled-scroll {
  overflow: hidden !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
</style>
