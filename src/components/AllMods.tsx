import ModList from "@/components/visual/ModList";
import useModStore from "@/store/state";
import { Mod, ModFilter } from "@/types";
import { useMemo } from "react";

const filterMods = (mods: Mod[], filters: ModFilter, search: string) => {
  return mods.filter((mod) => {
    const hasSearchTerm =
      mod.description.toLowerCase().includes(search.toLowerCase()) ||
      mod.name.toLowerCase().includes(search.toLowerCase());
    const hasModType =
      filters.type.length === 0 || filters.type.includes(mod.type);
    const hasModClass =
      filters.class.length === 0 ||
      !!(mod.class && filters.class.includes(mod.class));
    const hasModTier =
      filters.tier.length === 0 || filters.tier.includes(mod.tier);
    return hasSearchTerm && hasModTier && hasModType && hasModClass;
  });
};

const AllMods = () => {
  const mods = useModStore((state) => state.mods);
  const searchValue = useModStore((state) => state.search);
  const modFilters = useModStore((state) => state.filter);

  const filteredMods = useMemo(
    () =>
      filterMods(mods, modFilters, searchValue).sort(
        (mod1, mod2) => +!!mod2.isFavorite - +!!mod1.isFavorite,
      ),
    [modFilters, searchValue, mods],
  );

  return <ModList mods={filteredMods} />;
};

export default AllMods;
