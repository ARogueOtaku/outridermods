import { MOD_CLASSES, MOD_TIERS, MOD_TYPES } from "@/constants";

export type ModType = (typeof MOD_TYPES)[number];
export type ModTier = (typeof MOD_TIERS)[number];
export type ModClass = (typeof MOD_CLASSES)[number];

export type Mod = {
  id: string;
  type: ModType;
  tier: ModTier;
  class?: ModClass;
  name: string;
  description: string;
  isFavorite?: boolean;
};

export type ModFilter = {
  type: ModType[];
  tier: ModTier[];
  class: ModClass[];
};

export type AppState = {
  loading: boolean;
  mods: Mod[];
  favorites: Set<Mod["id"]>;
  search: string;
  filter: ModFilter;
};
