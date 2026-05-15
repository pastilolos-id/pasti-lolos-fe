export interface HomeHeroBannerApiItem {
  imageUrl?: string | null;
  linkUrl?: string | null;
  title?: string | null;
}

export interface HomeBannerApiItem {
  id?: number | string;
  imageUrl?: string | null;
  linkUrl?: string | null;
  title?: string | null;
}

export interface HomeFlashSaleApiItem {
  id: number;
  title: string;
  label: string;
  originalPrice: number;
  salePrice: number;
  ctaText: string;
}

export interface HomeFlashSaleApiSection {
  title?: string | null;
  endsAt?: string | null;
  remainingMs?: number | null;
  items?: HomeFlashSaleApiItem[] | null;
}

export interface HomeRankingApiRow {
  rank?: number;
  name?: string;
  totalScore?: number | null;
  scores?: Record<string, number | null> | null;
  [key: string]: unknown;
}

export interface HomeRankingApiCategorySection {
  columns?: string[] | null;
  rows?: HomeRankingApiRow[] | null;
}

export interface HomeRankingTryoutApiSection {
  activeCategory?: string | null;
  tabs?: string[] | null;
  bumn?: HomeRankingApiCategorySection | null;
  cpns?: HomeRankingApiCategorySection | null;
  [key: string]: unknown;
}

export interface HomeDashboardSuccessResponse {
  heroBanner?: HomeHeroBannerApiItem | null;
  banners?: HomeBannerApiItem[] | null;
  flashSale?: HomeFlashSaleApiSection | null;
  rankingTryout?: HomeRankingTryoutApiSection | null;
}
