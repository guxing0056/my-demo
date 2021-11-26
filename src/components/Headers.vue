<template>
  <div class="header-row row">
    <div class="logo_sm col-xs-3 col-sm-2 col-md-2 col-lg-2">
      <img src="../assets/img/Layer.png" alt="" width="40px" height="40px">
    </div>
    <ul class="top_ul hidden-xs col-sm-6  col-md-7 col-lg-7">
      <li>MEME IDO</li>
      <li>STAKE</li>
      <li>BOND</li>
      <li>INTRODUCTION</li>
    </ul>
    <div class="rig_btn col-xs-6 col-sm-2 col-md-3 col-lg-3">
      <div class="btn1 ">CONNECT WALLET</div>
    </div>
    <div class="hidden-md hidden-lg hidden-xl hidden-sm col-xs-3 btn-box">
      <div class="btn2" id="main_btn2" @click="handlePopoverOpen"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headers",
  data () {
    return {
    }
  },
  methods: {
    handlePopoverOpen () {
      this.$disabledScroll();
      this.$emit('handlePopoverOpen', true);
    }
  },
};
</script>

<style lang="less" scoped>
.header-row{
  position: relative;
  overflow: hidden;
}
.logo_sm {
  height: 40px;
}
.top_ul {
  display: flex;
  justify-content: flex-start;
  height: 40px;
  color: #fff;
  li {
    line-height: 40px;
    cursor: pointer;
    margin-right: 20px;
  }
}
.btn1 {
  font-size: 14px;
  width: 165px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid olive;
  color: olive;
  background-color: #15253b;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin: 0 auto;
}
.btn-box{
  position: absolute;
  margin: auto;
  right: -20px;
  top: 50%;
  height: 40px;
  transform: translateY(-60%);
}
#main_btn2 {
  width: 29px;
  height: 30px;
  background: url('../assets/img/main.png') no-repeat center center;
  margin-top: 8px;
}
</style>