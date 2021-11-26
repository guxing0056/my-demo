<template>
  <div class="px-3">
    <div v-if="isIdoOwner" class="my-5 text-white text-center">
      <button
        class="
          w-48
          rounded-full
          bg-indigo-700
          border border-transparent
          rounded-md
          py-1
          items-center
          justify-center
          text-base
          font-medium
          text-white
          hover:bg-indigo-800
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        type="button"
        @click.stop="handleToggleDepositStatus"
      >
        {{ isDepositOpen ? "关闭" : "开启" }} Deposite
      </button>
      <button
        class="
          w-48
          rounded-full
          bg-indigo-700
          border border-transparent
          rounded-md
          py-1
          items-center
          justify-center
          text-base
          font-medium
          text-white
          hover:bg-indigo-800
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
        type="button"
        @click.stop="handleToggleClaimStatus"
      >
        {{ isClaimOpen ? "关闭" : "开启" }} Claim
      </button>
    </div>
    <div class="logo_lg hidden-xs">
      <img class="hidden lg:block w-auto" src="@/assets/logo.png" />
    </div>

    <div class="photos">
      <p class="centers_p">IDO ON BSC</p>
      <div class="want">I want to</div>
      <div class="centers_btn">
        <span
          class="centers_btns centers_btn1"
          :class="{ active: type == 'deposit' }"
          @click.stop="handleSwitchType('deposit')"
          >Deposit</span
        >
        <span
          class="centers_btns centers_btn2"
          :class="{ active: type == 'claim' }"
          @click.stop="handleSwitchType('claim')"
          >Claim</span
        >
      </div>
      <div v-if="type == 'deposit'">
        <div class="cornss">
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
              "
            >
              <span class="text-gray-500 font-bold sm:text-sm"> USDC </span>
            </div>
            <input
              type="text"
              v-model="depositValue"
              class="
                rounded-full
                bg-black
                border-gray-900
                text-gray-300
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                pl-14
                pr-12
                sm:text-sm
                border-gray-300
                rounded-md
              "
              placeholder="0.00"
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <span
                class="max text-gray-100"
                @click.stop="handleSetMaxDepositValue"
                >MAX</span
              >
            </div>
          </div>
          <div class="text-right mr-3 text-white">
            USDC balance: {{ usdcBalance }}
          </div>
        </div>
        <button
          v-if="needApprove"
          type="button"
          class="
            m-auto
            w-64
            rounded-full
            bg-indigo-700
            border border-transparent
            rounded-md
            py-1
            px-4
            mb-3
            flex
            items-center
            justify-center
            text-base
            font-medium
            text-white
            hover:bg-indigo-800
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          @click.stop="handleMmpIdoApproveDeposit"
        >
          Approve
        </button>
        <button
          type="submit"
          class="
            m-auto
            w-64
            rounded-full
            bg-blue-800
            border border-transparent
            rounded-md
            py-1
            px-4
            mb-3
            flex
            items-center
            justify-center
            text-base
            font-medium
            text-white
            hover:bg-blue-900
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
          @click.stop="handleMmpIdoDeposit"
        >
          Deposit
        </button>
      </div>
      <div v-if="type == 'claim'">
        <div class="cornss">
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="
                absolute
                inset-y-0
                left-0
                pl-3
                flex
                items-center
                pointer-events-none
              "
            >
              <span class="text-gray-500 font-bold sm:text-sm"> USDC </span>
            </div>
            <input
              type="text"
              v-model="depositValue"
              class="
                rounded-full
                bg-black
                border-gray-900
                text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                pl-14
                pr-12
                sm:text-sm
                border-gray-300
                rounded-md
              "
              placeholder="0.00"
            />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <span class="max text-gray-100">MAX</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="
            m-auto
            mt-10
            w-64
            rounded-full
            bg-indigo-600
            border border-transparent
            rounded-md
            py-1
            px-4
            mb-3
            flex
            items-center
            justify-center
            text-base
            font-medium
            text-white
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          "
        >
          Claim
        </button>
      </div>

      <div>
        <p class="p2">TOTALSTAKERTOTAKERTOTALSTAKER</p>
        <p class="p3">KERTOTALSTAKER</p>
        <div class="time">
          <span>2</span>
          <span>4</span>
          <span
            style="
              background-color: #091830;
              color: antiquewhite;
              width: 10px;
              font-size: 12px;
            "
            >:</span
          >
          <span>5</span>
          <span>9</span>
          <span
            style="
              background-color: #091830;
              color: antiquewhite;
              width: 10px;
              font-size: 12px;
            "
            >:</span
          >
          <span>5</span>
          <span>9</span>
        </div>
      </div>
      <ul class="centers_ul" style="padding: 0">
        <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="centers_ul_en">USDC CONTRIBUTED</div>
          <div class="centers_ul_numb">
            {{ totalDeposited.toLocaleString() }}
          </div>
        </li>
        <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="centers_ul_en">ESTIMATED TOKEN PRICE</div>
          <div class="centers_ul_numb">{{ mmpIdoPrice }}</div>
        </li>
        <li class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="centers_ul_en">MMP FOR SALE</div>
          <div class="centers_ul_numb">15,000,000,000</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMmpStore, useWalletStore } from "@/store";
import { watch, ref, onMounted, computed, toRef } from "vue";

const mmpStore = useMmpStore();
const walletStore = useWalletStore();
const activeAccount = toRef(walletStore, "activeAccount");

const type = ref<"deposit" | "claim">("deposit");
const handleSwitchType = (toType: "deposit" | "claim") => {
  type.value = toType;
};

const usdcBalance = toRef(mmpStore, "usdcBalance");
watch(activeAccount, () => {
  if (activeAccount.value)
    mmpStore.loadUsdcBalance({ address: activeAccount.value });
});

const mmpIdoPrice = toRef(mmpStore, "mmpIdoPrice");
onMounted(() => {
  mmpStore.loadMmpIdoPrice();
});

const totalDeposited = toRef(mmpStore, "mmpIdoDeposited");
watch(activeAccount, () => {
  mmpStore.loadMmpIdoDeposited({ owner: activeAccount.value });
});

const depositValue = ref<number>();
const handleSetMaxDepositValue = () => {
  depositValue.value = usdcBalance.value;
};

const mmpIdoOwner = ref<string>();
onMounted(() => {
  mmpStore.loadMmpIdoOwner().then((owner) => (mmpIdoOwner.value = owner));
});
const isIdoOwner = computed(
  () =>
    mmpIdoOwner.value?.toLocaleUpperCase() ==
    activeAccount.value?.toLocaleUpperCase()
);

const usdcAllowance = toRef(mmpStore, "usdcAllowance");
const needApprove = computed(() => {
  return !!(depositValue.value && depositValue.value > usdcAllowance.value);
});
watch(activeAccount, () => {
  mmpStore.loadUsdcAllowance({ owner: activeAccount.value });
});
const handleMmpIdoApproveDeposit = () => {
  if (!needApprove.value || !depositValue.value) return; // TODO alert

  mmpStore.approveMmpIdoDeposit({
    amount: depositValue.value,
  });
};
const handleMmpIdoDeposit = () => {
  console.log(1);
  if (needApprove.value || !depositValue.value) return; // TODO alert

  mmpStore.mmpIdodeposit({
    amount: depositValue.value,
  });
};

const isDepositOpen = toRef(mmpStore, "mmpIdoDepositOpen");
const isClaimOpen = toRef(mmpStore, "mmpIdoClaimOpen");
onMounted(() => {
  mmpStore.loadMmpIdoDepositStatus();
  mmpStore.loadMmpIdoClaimStatus();
});
const handleToggleDepositStatus = () => {
  mmpStore.toggleMmpIdoDepositStatus();
};
const handleToggleClaimStatus = () => {
  mmpStore.toggleMmpIdoClaimStatus();
};
</script>

<style scoped>
.logo_sm {
  height: 40px;
}
.top_ul {
  display: flex;
  justify-content: flex-start;
  height: 40px;
  color: #fff;
}
.top_ul li {
  line-height: 40px;
  cursor: pointer;
  margin-right: 20px;
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

.container {
  padding-bottom: 80px;
  padding-top: 20px;
}

/*  center*/

.logo_lg {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 65px;
  background: url("../img/Layer.png");
  background-size: cover;
}
.photos {
  background: #091830;
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

  border-radius: 26px;

  margin: 20px auto;

  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #383d47;
  position: relative;
}
.max {
  width: 50px;
  cursor: pointer;
}
/* .cornsss {
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
} */
.want {
  text-align: center;
  font-size: 14px;
  color: #fff;
  line-height: 36px;
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
  font-weight: bold;
  color: yellow;
  text-align: center;
  line-height: 30px;
  background-color: #030f24;
  border-radius: 20%;
  margin-right: 5px;
}
.centers_btn {
  width: 230px;
  height: 40px;
  margin: 10px auto;
  position: relative;
}
.centers_btns {
  position: absolute;
  width: 130px;
  height: 40px;
  padding: 0 20px;
  text-align: center;
  line-height: 40px;

  cursor: pointer;
  border-radius: 40px;
  background-color: #062e73;
  color: #fff;
}
.centers_btn1 {
  top: 0;
  left: 0;
  padding-left: 15px;
}
.centers_btn2 {
  top: 0;
  right: 0;
}
.centers_btns.active {
  background-color: yellow;
  z-index: 100;
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

.foot {
  background-color: #030e1f;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.foot_warp {
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot_warp img {
  /* width: 20px;
    height: 20px; */
  padding: 20px;
}
.Popover {
  text-align: right;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  /* padding-top: 30px; */
  display: none;
  color: #fff;
  background: rgba(0, 0, 0, 0.29411764705882354);
  backdrop-filter: blur(20px);
}
.Popovertable {
  width: 70%;
  text-align: center;
  background-color: #282d37;
  height: 100%;
  padding-top: 30px;
  display: none;
  float: right;
}
.Popover ul {
  margin-top: 50px;
}
.Popover ul li {
  margin-bottom: 20px;
  cursor: pointer;
}
.Popover ul {
  margin-top: 50px;
}
.Popover ul li {
  margin-bottom: 20px;
  cursor: pointer;
}
#main_btn2 {
  width: 29px;
  height: 30px;
  background: url("../img/main.png");
  margin-top: 8px;
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
    position: inherit;
  }
}
</style>
