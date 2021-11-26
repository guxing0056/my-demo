<template>
  <div class="relative grid gap-6 bg-white sm:gap-8">
    <a
      href="#"
      class="p-3 flex justify-between rounded-lg bg-gray-100 hover:bg-gray-200"
      @click.stop="handleConnectWallet('metamask')"
    >
      <div class="flex items-center">
        <p class="text-base font-medium text-gray-900">Connect Metamask</p>
      </div>
      <img class="logo" src="@/assets/wallets/metamask.png" />
    </a>

    <!-- <a
      href="#"
      class="p-3 flex justify-between rounded-lg bg-gray-100 hover:bg-gray-200"
      @click.stop="handleConnectWallet('ronin')"
    >
      <div class="flex items-center">
        <p class="text-base font-medium text-gray-900">连接 Ronin Wallet</p>
      </div>
      <img class="logo" src="@/assets/wallets/ronin.png" />
    </a> -->
  </div>
</template>

<script lang="ts" setup>
import { useWalletStore } from "@/store";

const emit = defineEmits<{
  (event: "connected", value: string): void;
}>();

const walletStore = useWalletStore();

const handleConnectWallet = async (wallet: string) => {
  const connected = await walletStore.connectWallet(wallet);

  emit("connected", wallet);
};
</script>

<style scoped>
.logo {
  height: 30px;
}
</style>
