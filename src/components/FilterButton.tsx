import filterIcon from "@/assets/filter.svg";
import ModFilters from "@/components/ModFilters";
import Dialog from "@/components/visual/Dialog";
import Icon from "@/components/visual/Icon";
import { setModFilter } from "@/store/methods";
import { useState } from "react";

const FilterButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-center gap-1 border border-l-0 border-slate-700 p-1 px-2"
        onClick={() => setOpen(true)}
      >
        <Icon src={filterIcon} size={12} className="mt-0.5" alt="Search Icon" />
        <span>Filters</span>
      </button>
      <Dialog
        title="Filters"
        open={open}
        onClose={() => setOpen(false)}
        isModal
        className="custom-scroll w-full backdrop:bg-black backdrop:opacity-30 md:w-2/3 lg:w-3/5"
        headerClassName="p-2 pl-5 bg-slate-700 text-slate-100 font-bold"
      >
        <ModFilters
          onApplyFilter={(filters) => {
            setModFilter(filters);
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};

export default FilterButton;
