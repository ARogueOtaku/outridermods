import { AppState, Mod } from "../types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import JSONSafeParse from "@/utils/jsonsafeparse";

const initialAppState: AppState = {
  loading: false,
  favorites: new Set(),
  mods: [],
  search: "",
  filter: {
    class: [],
    tier: [],
    type: [],
  },
};

const useModStore = create(
  persist(() => initialAppState, {
    name: "mod_store",
    partialize: (state) => ({
      favorites: state.favorites,
    }),
    storage: createJSONStorage(() => localStorage, {
      reviver: (key, value) => {
        if (key === "favorites" && typeof value === "string")
          return new Set(JSONSafeParse<Mod[]>(value, []));
        return value;
      },
      replacer: (key, value) => {
        if (key === "favorites" && value instanceof Set)
          return JSON.stringify(Array.from(value));
        return value;
      },
    }),
  }),
);

export default useModStore;
