<template>
  <div class="ido">
    <div class="container">
      <Headers @handlePopoverOpen="handlePopoverOpen"></Headers>
      <main>
        <div class="row">
          <div class="logo_lg hidden-xs"></div>
        </div>
        <div class="photos">
          <p class="centers_p">IDO ON BSC</p>
          <div style="text-align: center;font-size: 12px;color: #fff;"> I want to</div>
          <div class="centers_btn">
            <span class="centers_btns centers_btn1">DEPOSIT</span>
            <span class="centers_btns centers_btn2">CLAM</span>
          </div>
          <div class="cornss">O USDC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0%
            <div class="cornsss">MAX</div>
          </div>
          <div class="corns">CLAIM</div>
          <div>
            <p class="p2">TOTALSTAKERTOTAKERTOTALSTAKER

            </p>
            <p class="p3">KERTOTALSTAKER

            </p>
            <div class="time">
              <span>2</span>
              <span>4</span>
              <span style="background-color: #091830;color: antiquewhite;width: 10px;font-size: 12px;">:</span>
              <span>5</span>
              <span>9</span>
              <span style="background-color: #091830;color: antiquewhite;width: 10px;font-size: 12px;">:</span>
              <span>5</span>
              <span>9</span>
            </div>
          </div>
          <ul class="centers_ul" style="padding: 0;">
            <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,666,999,456</div>
            </li>
            <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">$123,456,789.00</div>
            </li>
            <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="centers_ul_en">TOTALSTAKER</div>
              <div class="centers_ul_numb">123,456</div>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <Footers></Footers>
    <Popover :isShowPopover="isShowPopover" @handlePopoverClose="handlePopoverClose"></Popover>
  </div>
</template>

<script>
// @ is an alias to /src
import Headers from "@/components/Headers.vue";
import Footers from "@/components/Footers.vue";
import Popover from "@/components/Popover.vue";

export default {
  name: "Ido",
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
.ido {
  background-color: #091830;
  min-height: 100vh;
  // max-height: 100vh;
  // overflow: hidden;
  position: relative;
  .container {
    padding-bottom: 100px;
    padding-top: 20px;
  }
}
.logo_lg {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 65px;
  background: url('../assets/img/Layer.png');
  background-size: cover;
}
.photos {
  width: 300px;
  margin: 0 auto;
  border: 1px solid;
  box-shadow: -10px -1px 10px #030f24;
  padding-top: 10px;
  margin-top: 45px;
  height: 500px;
  border-radius: 10px;
}
.p2 {
  font-size: 12px;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
}
.p3 {
  color: #fff;
  text-align: center;
  font-size: 14px;
}
.centers_p {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #edc921;
  font-weight: 600;
  width: 300px;
  word-wrap: break-word;
  font-size: 18px;
  color: #fcee21;
  text-align: center;
}
.corns {
  width: 260px;
  height: 26px;
  border-radius: 26px;
  background-color: red;
  margin: 0 auto;
  margin-bottom: 8px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #fff;
}
.cornss {
  width: 260px;
  height: 26px;
  border-radius: 26px;
  background-color: #030f24;
  margin: 0 auto;
  margin-bottom: 8px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #383d47;
  position: relative;
}
.cornsss {
  width: 50px;
  height: 22px;
  border-radius: 26px;
  background-color: #062e73;
  margin: 0 auto;
  margin-bottom: 8px;
  text-align: center;
  line-height: 22px;
  font-size: 14px;
  color: #fff;
  position: absolute;
  top: 2px;
  right: 3px;
}

.time {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.time span {
  display: inline-block;
  height: 30px;
  width: 20px;
  font-size: 16px;
  font-weight: 600;
  color: yellow;
  text-align: center;
  line-height: 30px;
  background-color: #030f24;
  border-radius: 20%;
  margin-right: 5px;
}
.centers_btn {
  width: 200px;
  height: 40px;
  margin: 10px auto;
  position: relative;
}
.centers_btns {
  position: absolute;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 40px;
}
.centers_btn1 {
  background-color: #062e73;
  color: #fff;
  top: 0;
  left: 0;
  padding-left: 15px;
  text-align: left;
}
.centers_btn2 {
  background-color: yellow;
  top: 0;
  right: 0;
  color: #000;
}
.centers_ul {
  height: 80px;
  text-align: center;
  padding: 0 14px;
}
.centers_ul li {
  padding-top: 6px;
  height: 50px;
  margin-bottom: 3px;
  background-color: #0a2149;
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
  .foot {
    background-color: #030e1f;
  }
  .photos {
    width: auto;
  }
  .centers_p {
    width: auto;
  }
  .btn1 {
    border-radius: 0;
    width: 135px;
  }
  .foot {
    position: absolute;
  }
}
</style>
