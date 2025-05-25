import { createStore } from "zustand-x";

import { User } from "@shared/types/user";

export const userStore = createStore<{ user: User | null; token: string }>(
  { user: null, token: "" },
  { name: "userStore", persist: true }
).extendSelectors(({ get }) => ({
  isUserLoggedIn: () => get("user") && get("token"),
}));

export { userStore as default };
