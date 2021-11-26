<script setup lang="ts"></script>

<template>
  <NavBar :title="config.app.name" />
  <router-view></router-view>

  <notificationGroup group="top">
    <div
      class="
        fixed
        inset-0
        flex
        px-4
        py-6
        pointer-events-none
        p-6
        items-start
        justify-end
      "
    >
      <div class="max-w-sm w-full">
        <notification v-slot="{ notifications }">
          <div
            class="
              flex
              max-w-sm
              w-full
              mx-auto
              bg-white
              shadow-md
              rounded-lg
              overflow-hidden
              mt-4
            "
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="flex justify-center items-center w-12 bg-green-500">
              <svg
                class="h-6 w-6 fill-current text-white"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                ></path>
              </svg>
            </div>

            <div class="-mx-3 py-2 px-4">
              <div class="mx-3">
                <span class="text-green-500 font-semibold">
                  {{ notification.title }}
                </span>
                <p class="text-gray-600 text-sm">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </notification>
      </div>
    </div>
  </notificationGroup>
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import { useConfig } from "@/config";
const config = useConfig();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #091830;
}

.section-title {
  margin: 0;
  padding: 20px 16px 16px;
  color: #455a6499;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
.mt-md {
  margin-top: 16px;
}
.my-md {
  margin-left: 16px;
  margin-right: 16px;
}
.color-primary {
  color: #1989fa;
}
</style>
