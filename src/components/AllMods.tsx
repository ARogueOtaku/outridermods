import ModList from "@/components/visual/ModList";
import useModStore from "@/store/state";
import { useMemo } from "react";

const AllMods = () => {
  const mods = useModStore((state) => state.mods);
  const searchValue = useModStore((state) => state.filter.search);

  const filteredMods = useMemo(
    () =>
      [...mods].filter(
        (mod) =>
          mod.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          mod.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue, mods],
  );

  return <ModList mods={filteredMods} />;
};

export default AllMods;
