import { createStore } from "zustand-x";

export const authStore = createStore<{ resetToken: string }>(
  { resetToken: "" },
  { name: "authStore", persist: true }
);

export { authStore as default };
