import { defineStore, PiniaPluginContext } from "pinia";

const STORE_ID = "loading";

interface LoadingState {
  loading: {
    [key: string]: boolean | undefined;
  };
}

export const useLoadingStore = defineStore({
  id: STORE_ID,
  state: (): LoadingState => ({
    loading: {},
  }),
  actions: {
    triggerLoading(name: string, value?: boolean) {
      this.loading[name] = value !== undefined ? value : this.loading[name];
    },

    async loadingWith<T>(name: string, callback: () => Promise<T>) {
      try {
        this.triggerLoading(name, true);
        return await callback();
      } finally {
        this.triggerLoading(name, false);
      }
    },
  },
});

export function loading(context: PiniaPluginContext) {
  if (context.store.$id == STORE_ID) return; // without loading store

  const loadingStore = useLoadingStore();

  context.store.$onAction(({ name, store, after, onError }) => {
    const loadingName = `${store.$id}${name[0].toUpperCase() + name.slice(1)}`;
    loadingStore.triggerLoading(loadingName, true);

    const trigger = () => {
      loadingStore.triggerLoading(loadingName, false);
    };

    after(trigger);
    onError(trigger);
  });
}
