import { ModClass, ModType } from "@/types";

const modColors: Record<
  ModType | ModClass,
  {
    bg: string;
    text: string;
  }
> = {
  weapon: {
    bg: "bg-slate-100",
    text: "",
  },
  armor: {
    bg: "bg-slate-100",
    text: "",
  },
  devastator: {
    bg: "bg-yellow-100",
    text: "",
  },
  pyromancer: {
    bg: "bg-red-100",
    text: "",
  },
  technomancer: {
    bg: "bg-green-100",
    text: "",
  },
  trickster: {
    bg: "bg-blue-100",
    text: "",
  },
};

export default modColors;
