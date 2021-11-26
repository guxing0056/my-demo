import { reactive } from "vue";

export interface Config {
  author: {
    mail: string;
  };
  app: {
    name: string;
  };
  contracts: {
    [key: string]: string;
  };
}

const config = reactive({
  author: {
    mail: "admin@admin.com",
  },
  app: {
    name: "MeMeLaunchpad",
  },
  contracts: {
    USDC: "0xb9050803f2618eaf19cf3f985092e9c62068ea21",
    MMP: "0xc3d1072c94f1b0f32d1e12ac8d12c0599b475fbd",
    MMP_IDO: "0x1541e0012bcccfdb9daf982ef8c940bd510fdc00",
  },
} as Config);

export function useConfig() {
  return config;
}
