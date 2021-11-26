<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="@/assets/logo.png"
              :alt="title"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="@/assets/logo.png"
              :alt="title"
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in menu"
                :key="item.name"
                :to="item.href"
                class="
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                  text-gray-300
                  hover:bg-gray-700 hover:text-white
                "
                active-class="bg-gray-900 text-white"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <a
                v-if="!activeAccount"
                href="#"
                class="
                  text-gray-300
                  border-solid border border-gray-400
                  hover:bg-gray-700 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-medium
                "
                @click.stop="handleShowWalletConnectModal"
              >
                Connect Wallet
              </a>

              <button
                v-else
                class="
                  text-gray-300
                  border-solid border border-gray-400
                  hover:bg-gray-700 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-sm
                  font-bold
                "
              >
                {{ activeAccountString }}
              </button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>

  <TransitionRoot appear :show="walletConnectModalShow" as="template">
    <Dialog as="div" @close.stop="handleCloseWalletConnectModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 mb-4"
              >
                Connect Wallet
              </DialogTitle>

              <WalletConnect @connected="handleCloseWalletConnectModal" />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { ref, toRef, onMounted, computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import WalletConnect from "./WalletConnect.vue";
import { useWalletStore } from "@/store";
import { hasConnectedAddress, onEvent } from "@/utils/web3";
import { hideStr } from "@/utils";
import { navigation } from "@/router";

const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: "标题",
  }
);

const menu = ref(navigation);

const walletConnectModalShow = ref(false);
const handleShowWalletConnectModal = () =>
  (walletConnectModalShow.value = true);
const handleCloseWalletConnectModal = () =>
  (walletConnectModalShow.value = false);

const walletStore = useWalletStore();

onMounted(() => {
  if (hasConnectedAddress()) {
    walletStore.loadAccounts();
  }

  onEvent("accountsChanged", (accounts: string[]) => {
    if (!accounts.length) {
      return walletStore.cleanAccounts();
    }

    walletStore.loadAccounts();
  });
});

const activeAccount = toRef(walletStore, "activeAccount");
const activeAccountString = computed(() => {
  if (!activeAccount.value) return "";

  return hideStr(activeAccount.value);
});
</script>

<style scoped></style>
