import { createStore } from "vuex";

import { api_getCity } from "@/api/index";

import type { IAppStore } from "./types";

export default createStore<IAppStore>({
  state: {
    city: [],
    theme: [
      "Недоволен качеством услуг",
      "Расторжение договора",
      "Не приходит письмо активации на почту",
      "Не работает личный кабинет",
    ],
  },
  mutations: {},
  actions: {
    getCity: async ({ state }) => {
      const сities = await api_getCity();
      state.city = сities;
      return сities;
    },
  },
});
