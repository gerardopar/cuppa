import { createStore } from "zustand-x";

export const navStore = createStore<{ isSlideOpen: boolean }>(
  { isSlideOpen: false },
  { name: "navStore", persist: false }
);
