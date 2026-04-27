import type { TryoutCategory } from "../data";
import type { TryoutCardData } from "./TryoutCard/types";

export interface TryoutLayoutProps {
  category: TryoutCategory;
  bannerTitle: string;
  bannerSubtitle: string;
  cards: TryoutCardData[];
}
