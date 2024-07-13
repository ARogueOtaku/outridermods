import Table, { TableColumn } from "@/components/visual/Table";
import { toggleFavorite } from "@/store/actions";
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
      <input
        type="checkbox"
        checked={!!mod.isFavorite}
        onChange={() => toggleFavorite(mod.id)}
      />
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
      headerCellClassName="p-2 bg-slate-700 text-slate-100 sticky top-0 border-t-0 border border-slate-700"
      rowCellClassName={(row) =>
        "px-2 border border-slate-700 " + getModColors(row)
      }
      emptyRowCellClassName="text-center py-3"
    />
  );
};

export default ModList;
