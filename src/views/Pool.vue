<template>
  <div class="pool">
    <div class="container">
      <Headers @handlePopoverOpen="handlePopoverOpen"></Headers>
      <main>
        <div class="cons">

          <div class="centers">
            <div class="pools">
              <p>POOLS</p>
            </div>
            <div class="pools-text">
              <span>more projects coming soon</span>
              <div>3</div>
            </div>
            <div class="pools-div">
              <div class="pools-div-conter">
                <div class="pools-div-top"></div>
                <div class="pools-div-bottom">
                  <div class="p-d-b-img">
                    <img src="../assets/img/Layer44.png" alt="">
                  </div>
                  <div class="p-d-b-text">
                    <p>PROJECT A</p>
                    <span>Whitelist ends 0.400 pm 18 nov 2021</span>
                  </div>
                  <div class="p-d-b-conten">
                    <div class="pools-button">PUBLIC</div>
                  </div>
                  <div class="pd-b-table">
                    <ul>
                      <li></li>
                      <li><span>TOTAL RAISE</span><span>TBA</span></li>
                      <li><span>TOTAL SALES</span><span>TBA</span></li>
                      <li><span>TARE</span><span>TBA</span></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="pools-div-conter">
                <div class="pools-div-top"></div>
                <div class="pools-div-bottom">
                  <div class="p-d-b-img">
                    <img src="../assets/img/Layer44.png" alt="">
                  </div>
                  <div class="p-d-b-text">
                    <p>PROJECT A</p>
                    <span>Whitelist ends 0.400 pm 18 nov 2021</span>
                  </div>
                  <div class="p-d-b-conten">
                    <div class="pools-button">PUBLIC</div>
                  </div>
                  <div class="pd-b-table">
                    <ul>
                      <li></li>
                      <li><span>TOTAL RAISE</span><span>TBA</span></li>
                      <li><span>TOTAL SALES</span><span>TBA</span></li>
                      <li><span>TARE</span><span>TBA</span></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  name: "Pool",
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
.pool {
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
}
.centers_ul li {
  height: 40px;
  /* display: flex; */
  /* justify-content:space-between; */
  margin-bottom: 10px;
  /* align-items: center; */
}
.centers_ul2 {
  display: none;
}
.centers_ul2 li {
  padding: 0 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  background-color: #2c3039;
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
.centers-son {
  width: 300px;
}
.pools p {
  margin: 0;
  margin-top: 50px;
  font-size: 30px;
  font-weight: 600;
  color: #fcee21;
}
.pools-text span {
  color: #fff;
  font-size: 20px;
}
.pools-text div {
  margin-left: 10px;
  color: #000;
  width: 40px;
  height: 25px;
  display: inline-block;
  font-size: 15px;
  background-color: #fcee21;
  text-align: center;
  border-radius: 15px;
  font-weight: 700;
}
.pools-div .pools-div-conter {
  width: 300px;
  height: 400px;
  background-color: #fff;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 100px;
}
.pools-div-top {
  height: 33.33%;
}
.pools-div-bottom {
  height: 66.66%;
  border-radius: 0 0 7px 7px;
  background-color: #081b3c;
}
.p-d-b-img {
  width: 100%;
  text-align: center;
}
.pools-div-bottom img {
  width: 50px;
  height: 50px;
  margin-top: -7%;
  margin-left: auto;
  margin-right: auto;
}
.p-d-b-text {
  text-align: center;
}
.p-d-b-text p {
  margin: 0;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #fcee21;
}
.p-d-b-text span {
  color: #fff;
  font-size: 15px;
}
.p-d-b-conten {
  padding: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
}
.pools-button {
  width: 100px;
  height: 40px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  border-radius: 15px;
  background-color: #062e73;
}
.pd-b-table {
  background-color: #0a2149;
  color: #fff;
  font-size: 10px;
  padding: 40px;
  padding-bottom: 0;
  padding-top: 0;
}
.pd-b-table ul {
  margin: 0;
}
.pd-b-table ul li {
  margin-bottom: 10px;
  overflow: hidden;
}
.pd-b-table ul li span:nth-child(2) {
  float: right;
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
    position: absolute;
  }

  .pools-div .pools-div-conter {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
  .btn1 {
    border-radius: 0;
    width: 135px;
  }
}
</style>
