import { defineStore } from "pinia";

export const useCounterStore = defineStore("counterStore", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => {
      state.counter * 2;
    },
  },
  actions: {
    reset() {
      this.counter = 0;
    },
    increment() {
      this.counter++;
    },
  },
});
