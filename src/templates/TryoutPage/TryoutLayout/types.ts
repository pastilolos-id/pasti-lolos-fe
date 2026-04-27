import type { TryoutCardData } from "./TryoutCard/types";

export type TryoutCategory = "bumn" | "cpns";

export interface TryoutLayoutProps {
  category: TryoutCategory;
  bannerTitle: string;
  bannerSubtitle: string;
  cards: TryoutCardData[];
}
