import type { TryoutCategory } from "../data";
import type { TryoutCardData } from "./TryoutCard/types";

export type TryoutListGridStatus = "success" | "loading" | "error" | "empty";

export interface TryoutLayoutProps {
  category: TryoutCategory;
  bannerTitle: string;
  bannerSubtitle: string;
  cards: TryoutCardData[];
  gridStatus: TryoutListGridStatus;
  onRetryLoadCards?: () => void;
}
