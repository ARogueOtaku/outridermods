import Table, { TableColumn } from "@/components/visual/Table";
import { toggleFavorite } from "@/store/methods";
import { Mod } from "@/types";
import modColors from "@/utils/modcolors";

interface ModListProps {
  mods: Mod[];
}

const getModColors = (mod: Mod) => {
  if (mod.class) {
    return modColors[mod.class].bg + " " + modColors[mod.class].text;
  }
  return modColors[mod.type].bg + " " + modColors[mod.type].text;
};

const modColumns: TableColumn<Mod>[] = [
  {
    label: "Name",
    dataKey: "name",
  },
  {
    label: "Tier",
    dataKey: "tier",
  },
  {
    label: "Description",
    dataKey: "description",
  },
  {
    label: "Favorite",
    dataKey: "",
    customRender: (mod) => (
      <>
        <label
          htmlFor={`fav-${mod.id}`}
          className="inline-block h-0 w-0 overflow-hidden"
        >{`${mod.isFavorite ? "Remove" : "Mark"} ${mod.name} as favorite`}</label>
        <input
          id={`fav-${mod.id}`}
          type="checkbox"
          checked={!!mod.isFavorite}
          onChange={() => toggleFavorite(mod.id)}
        />
      </>
    ),
  },
];

const ModList = ({ mods }: ModListProps) => {
  return (
    <Table
      columns={modColumns}
      rows={mods}
      rowKey={(row) => row.id}
      className="w-full"
      headerCellClassName="sticky top-0 border border-t-0 border-slate-700 bg-slate-700 p-2 text-slate-100"
      rowCellClassName={(row) =>
        "border border-slate-700 px-2 " + getModColors(row)
      }
      emptyRowCellClassName="py-3 text-center"
    />
  );
};

export default ModList;
