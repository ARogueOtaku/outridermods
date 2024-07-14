import Icon from "@/components/visual/Icon";
import Values from "@/components/visual/Values";
import { MOD_CLASSES, MOD_TIERS, MOD_TYPES } from "@/constants";
import useModStore from "@/store/state";
import { ModClass, ModFilter, ModTier, ModType } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import filterIcon from "@/assets/filter-slate.svg";

interface ModFiltersInterface {
  onApplyFilter?: (filters: ModFilter) => void;
}

const ButtonChip = <T,>({
  value,
  render,
  onClick,
}: {
  value: T;
  render?: (value: T) => ReactNode;
  onClick: (value: T) => void;
}) => {
  return (
    <div className="flex items-center bg-slate-300">
      {render?.(value) ?? (
        <span className="px-2 py-1 capitalize">{value + ""}</span>
      )}
      <button className="bg-slate-100 px-2 py-1" onClick={() => onClick(value)}>
        X
      </button>
    </div>
  );
};

const ModFilters = ({ onApplyFilter }: ModFiltersInterface) => {
  const modTypeFilters = useModStore((state) => state.filter);
  const [filters, setFilters] = useState<ModFilter>(modTypeFilters);
  const [isDirty, setIsDirty] = useState(false);

  const addSingleFilter = <T extends keyof ModFilter>(
    type: T,
    value: ModFilter[typeof type][number],
  ) => {
    setIsDirty(true);
    setFilters((oldFilters) => ({
      ...oldFilters,
      [type]: [...oldFilters[type], value],
    }));
  };

  const removeSingleFilter = <T extends keyof ModFilter>(
    type: T,
    value: ModFilter[typeof type][number],
  ) => {
    setIsDirty(true);
    setFilters((oldFilters) => ({
      ...oldFilters,
      [type]: oldFilters[type].filter((filter) => filter !== value),
    }));
  };

  const submitFilters = () => {
    onApplyFilter?.(filters);
  };

  useEffect(() => {
    setFilters(modTypeFilters);
  }, [modTypeFilters]);

  return (
    <div className="text-x3 flex flex-col gap-4 py-2">
      <Values
        title="Mod Type"
        defaultOptionLabel="Select Mod Type"
        className="border-t border-slate-700 px-3 py-2"
        headerClass="ml-2 bg-slate-700 p-0.5 px-3 text-xs text-slate-100 flex-wrap"
        valueListClassName="ml-2 flex items-center gap-2"
        selectClassName="py-1"
        valueRender={(modType) => (
          <ButtonChip
            value={modType}
            onClick={(modType) => removeSingleFilter("type", modType)}
          />
        )}
        values={filters.type}
        options={MOD_TYPES as unknown as ModType[]}
        addValue={(modType) => addSingleFilter("type", modType)}
      />
      <Values
        title="Mod Class"
        defaultOptionLabel="Select Mod Class"
        className="border-t border-slate-700 px-3 py-2"
        headerClass="ml-2 bg-slate-700 p-0.5 px-3 text-xs text-slate-100"
        valueListClassName="ml-2 flex flex-wrap items-center gap-2"
        selectClassName="py-1"
        valueRender={(modClass) => (
          <ButtonChip
            value={modClass}
            onClick={(modClass) => removeSingleFilter("class", modClass)}
          />
        )}
        values={filters.class}
        options={MOD_CLASSES as unknown as ModClass[]}
        addValue={(modClass) => addSingleFilter("class", modClass)}
      />
      <Values
        title="Mod Tier"
        defaultOptionLabel="Select Mod Tier"
        className="border-t border-slate-700 px-3 py-2"
        headerClass="ml-2 bg-slate-700 p-0.5 px-3 text-xs text-slate-100"
        valueListClassName="ml-2 flex flex-wrap items-center gap-2"
        selectClassName="py-1"
        valueRender={(modTier) => (
          <ButtonChip
            value={modTier}
            onClick={(modTier) => removeSingleFilter("tier", modTier)}
          />
        )}
        values={filters.tier}
        options={MOD_TIERS as unknown as ModTier[]}
        addValue={(modTier) => addSingleFilter("tier", modTier)}
      />
      <button
        className="mx-3 flex w-fit items-center gap-1 self-end justify-self-end bg-slate-700 p-1 px-2 text-xs text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={submitFilters}
        disabled={!isDirty}
      >
        <Icon
          src={filterIcon}
          size={12}
          className="mt-0.5 text-slate-100"
          alt="Search Icon"
        />
        <span>Apply Filters</span>
      </button>
    </div>
  );
};

export default ModFilters;
