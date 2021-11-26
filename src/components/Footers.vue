<template>
  <div class="foot">
    <div class="foot_warp">
      <div><img src="../assets/img/Layer41.png" alt=""></div>
      <div><img src="../assets/img/Layer42.png" alt=""></div>
      <div><img src="../assets/img/Layer48.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footers",
};
</script>

<style lang="less" scoped>
.foot {
  background-color: #030e1f !important;
  position: absolute;
  bottom: 0 !important;
  left: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  .foot_warp {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      /* width: 20px;
    height: 20px; */
      padding: 20px;
    }
  }
}
</style>