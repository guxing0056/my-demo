<template>
  <div class="Popover" v-show="isShowPopovers" @click="handlePopoverClose">
    <div class="Popovertable" :class="{'open-pop-right':isShowPopovers,'close-pop-right':!isShowPopovers}">
      <div>
        <img src="../assets/img/Layer.png" alt="" width="40px" height="40px">
      </div>
      <ul>
        <li v-for="(item ,index) in contents" :key="index" @click="routerTo(item)">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popover",
  data () {
    return {
      contents: [
        {
          text: "MEME IDO"
        },
        {
          text: "STAKE"
        },
        {
          text: "BOND"
        },
        {
          text: "INTRODUCTION"
        }
      ],
      isShowPopovers: false
    }
  },
  props: {
    isShowPopover: {
      type: Boolean,
      default: false
    }
  },
  created () { },
  mounted () { },
  watch: {
    isShowPopover: {
      handler (val) {
        this.isShowPopovers = val;
        if (val === false) {
          this.handlePopoverClose();
        }
      },
      deep: true
    }
  },
  methods: {
    routerTo (item) {
      console.log(item);
      this.handlePopoverClose();
    },
    handlePopoverClose () {
      this.isShowPopovers = false;
      this.$canScroll();
      this.$emit(`handlePopoverClose`, this.isShowPopovers);
    },
  }
};
</script>

<style lang="less" scoped>
.Popover {
  font-family: Times New Roma;
  text-align: right;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /* padding-top: 30px; */
  color: #fff;
  background: rgba(0, 0, 0, 0.29411764705882354);
  backdrop-filter: blur(20px);
  overflow: hidden !important;
  .Popovertable {
    width: 70vw;
    text-align: center;
    background-color: #282d37;
    height: 100vh;
    padding-top: 30px;
    // display: none;
    float: right;
  }
  ul {
    margin-top: 50px;
    li {
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}

.open-pop-right {
  animation: openPop 2s linear forwards;
}
.clsoe-pop-right {
  animation: closePop 2s linear forwards;
}
@keyframes openPop {
  0% {
    width: 70%;
    max-width: 70%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    right: -100%;
    bottom: 0;
    margin: auto;
  }
  100% {
    width: 70%;
    max-width: 70%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
@keyframes closePop {
  0% {
    width: 70%;
    max-width: 70%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  100% {
    width: 70%;
    max-width: 70%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    right: -100%;
    bottom: 0;
    margin: auto;
  }
}
</style>
<style scoped>
</style>