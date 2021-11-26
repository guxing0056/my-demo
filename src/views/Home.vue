<template>
  <div class="home">
    <div class="container">
      <Headers @handlePopoverOpen="handlePopoverOpen"></Headers>
      <main>
        <div class="row">
          <div class="logo_lg hidden-xs"></div>
        </div>
        <p class="centers_p">The first MultiChain Launchpad, exclusively for the Meme coins</p>
        <div class="centers_btn">
          <span class="centers_btns centers_btn1">ENTER IDO</span>
          <span class="centers_btns centers_btn2">LITERPAPER</span>
        </div>
        <div>
          <ul class="centers_ul">
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,456</div>
            </li>
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">$123,456,789.00</div>
            </li>
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,456</div>
            </li>
          </ul>
        </div>
        <div>
          <ul class="centers_ul2">
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,456</div>
            </li>
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">$123,456,789.00</div>
            </li>
            <li>
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,456</div>
            </li>
          </ul>
        </div>
        <div class="chacha">
          <span>X</span>
          <span>X</span>
          <span>X</span>
        </div>
      </main>
      <Footers></Footers>
      <Popover :isShowPopover="isShowPopover" @handlePopoverClose="handlePopoverClose"></Popover>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Headers from "@/components/Headers.vue";
import Footers from "@/components/Footers.vue";
import Popover from "@/components/Popover.vue";

export default {
  name: "Home",
  components: {
    Headers, Footers, Popover
  },
  data () {
    return {
      isShowPopover: false
    }
  },
  methods: {
    handlePopoverOpen (flag) {
      this.isShowPopover = flag;
    },
    handlePopoverClose (flag) {
      this.isShowPopover = flag;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  background-color: #091830;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  .container {
    padding-bottom: 100px;
    padding-top: 20px;
  }
}
/deep/ .foot {
  position: absolute !important;
}
.logo_lg {
  width: 165px;
  height: 165px;
  margin: 0 auto;
  margin-top: 65px;
  background: url('../assets/img/Layer.png');
  background-size: cover;
}
.centers_p {
  font-weight: 600;
  margin: 0 auto;
  margin-top: 35px;
  width: 300px;
  word-wrap: break-word;
  font-size: 18px;
  color: #fcee21;
}
.centers_btn {
  width: 300px;
  height: 40px;
  margin: 30px auto;
  position: relative;
}
.centers_btns {
  position: absolute;
  width: 140px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 40px;
}
.centers_btn1 {
  background-color: #fdd420;
  color: #000;
  top: 0;
  left: 0;
}
.centers_btn2 {
  background-color: #f15423;
  top: 0;
  right: 0;
  color: #fff;
}
.centers_ul {
  /* padding-top: 40px;
    padding-bottom: 10px; */
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 20px;
  li {
    height: 40px;
    /* display: flex; */
    /* justify-content:space-between; */
    margin-bottom: 10px;
    /* align-items: center; */
  }
}
.centers_ul2 {
  display: none;
  li {
    padding: 0 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
    background-color: #2c3039;
  }
}
.centers_ul_en {
  font-size: 12px;
  color: #fff;
}
.centers_ul_numb {
  font-size: 16px;
  font-weight: 600;
  color: #fdd420;
}

.chacha {
  display: flex;
  justify-content: space-around;
  width: 80px;
  margin: 0 auto;
  padding-bottom: 50px;
}
.chacha span {
  color: #fff;
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}
.chacha span:nth-child(2) {
  color: yellow;
}
@media (min-width: 276px) and (max-width: 767px) {
  .chacha {
    display: none;
  }
  .centers_ul2 {
    display: block;
  }
  .centers_ul1 {
    display: none;
  }
  body {
    background-color: #1f232d;
  }
  .foot {
    background-color: #030e1f;
  }
  .centers_btn2 {
    border-radius: 0;
    background-color: #f26e63;
  }
  .centers_btn1 {
    border-radius: 0;
  }
  .btn1 {
    border-radius: 0;
    width: 135px;
  }
  .foot {
    position: absolute;
  }
  @media (max-width: 800px) {
    //   .foot {
    //   position: fixed;
    // }
  }
}
</style>
