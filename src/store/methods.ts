import { Mod, ModFilter } from "../types";
import useModStore from "./state";
const { setState, getState } = useModStore;

export const initStore = async () => {
  const { favorites } = getState();
  setState(() => ({ loading: true }));
  try {
    const { all } = (await (
      await fetch(
        `https://raw.githubusercontent.com/ARogueOtaku/files/master/outriders_mods.json`,
      )
    ).json()) as { all: Mod[] };
    if (Array.isArray(all)) {
      all.forEach((mod) => (mod.isFavorite = favorites.has(mod.id)));
      setState(() => ({ mods: all, filteredMods: all }));
    }
  } catch (err) {
    console.error(err);
  }
  setState(() => ({ loading: false }));
};

export const toggleFavorite = (id: string) => {
  const { mods, favorites } = getState();
  const selectedMod = mods.find((mod) => mod.id === id);
  if (selectedMod) {
    if (selectedMod.isFavorite) {
      selectedMod.isFavorite = false;
      favorites.delete(selectedMod.id);
    } else {
      selectedMod.isFavorite = true;
      favorites.add(selectedMod.id);
    }
  }
  setState(() => ({ mods: [...mods], favorites: new Set(favorites) }));
};

export const setSearchInput = (newInput: string) => {
  setState(() => ({
    search: newInput,
  }));
};

export const setModFilter = (newFilter: ModFilter) => {
  setState(() => ({
    filter: newFilter,
  }));
};
