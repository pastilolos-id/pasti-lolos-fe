import type {
  HomeBannerApiItem,
  HomeDashboardSuccessResponse,
  HomeFlashSaleApiItem,
  HomeRankingApiCategorySection,
  HomeRankingApiRow,
} from "@/lib/redux/api/types/home";

export interface HomeBannerViewModel {
  id: string;
  imageUrl: string | null;
  linkUrl: string | null;
  title: string | null;
}

export interface HomeFlashSaleItemViewModel {
  id: number;
  title: string;
  label: string;
  originalPrice: number;
  salePrice: number;
  ctaText: string;
  checkoutHref: string;
}

export interface HomeRankingRowViewModel {
  raw: Record<string, string | number | null>;
}

export interface HomeRankingViewModel {
  activeCategory: string;
  tabs: string[];
  columnsByCategory: Record<string, string[]>;
  byCategory: Record<string, HomeRankingRowViewModel[]>;
}

export interface HomeFlashSaleViewModel {
  title: string;
  endsAtMs: number | null;
  items: HomeFlashSaleItemViewModel[];
}

export interface HomeDashboardViewModel {
  heroBanner: HomeBannerViewModel | null;
  banners: HomeBannerViewModel[];
  flashSale: HomeFlashSaleViewModel | null;
  rankingTryout: HomeRankingViewModel | null;
}

function toSafeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function mapBannerItem(
  item: HomeBannerApiItem,
  fallbackId: string,
): HomeBannerViewModel {
  return {
    id: String(item.id ?? fallbackId),
    imageUrl: toSafeText(item.imageUrl),
    linkUrl: toSafeText(item.linkUrl),
    title: toSafeText(item.title),
  };
}

function mapFlashSaleItem(
  item: HomeFlashSaleApiItem,
): HomeFlashSaleItemViewModel {
  const label = toSafeText(item.label)?.toLowerCase() ?? "tryout";
  const productType =
    label === "materi" || label === "course" ? "course" : "tryout";
  return {
    id: item.id,
    title: item.title,
    label,
    originalPrice: item.originalPrice,
    salePrice: item.salePrice,
    ctaText: item.ctaText || "Beli Sekarang",
    checkoutHref: `/checkout/${item.id}?productType=${productType}`,
  };
}

function mapRankingRow(item: HomeRankingApiRow): HomeRankingRowViewModel {
  const raw: Record<string, string | number | null> = {};
  const scoresRaw =
    item.scores && typeof item.scores === "object" ? item.scores : {};

  for (const [key, value] of Object.entries(item)) {
    if (key === "scores") continue;
    if (typeof value === "number" && Number.isFinite(value)) {
      raw[key] = value;
      continue;
    }
    if (typeof value === "string") {
      raw[key] = value;
      continue;
    }
    if (value == null) {
      raw[key] = null;
    }
  }

  for (const [scoreKey, scoreValue] of Object.entries(scoresRaw)) {
    const normalizedScore = toNumberOrNull(scoreValue);
    raw[`scores.${scoreKey}`] = normalizedScore;
  }

  return {
    raw,
  };
}

function mapRankingCategory(rawSection: unknown): {
  columns: string[];
  rows: HomeRankingRowViewModel[];
} {
  const safeSection =
    rawSection && typeof rawSection === "object"
      ? (rawSection as HomeRankingApiCategorySection)
      : null;
  const columns = Array.isArray(safeSection?.columns)
    ? safeSection.columns.filter((column) => typeof column === "string")
    : [];
  const rows = Array.isArray(safeSection?.rows)
    ? safeSection.rows.map(mapRankingRow).sort((a, b) => {
        const rankA = toNumberOrNull(a.raw.rank) ?? Number.MAX_SAFE_INTEGER;
        const rankB = toNumberOrNull(b.raw.rank) ?? Number.MAX_SAFE_INTEGER;
        return rankA - rankB;
      })
    : [];

  return { columns, rows };
}

function parseEndsAtMs(endsAt: unknown, remainingMs: unknown): number | null {
  const parsedIso = toSafeText(endsAt);
  if (parsedIso) {
    const fromIso = Date.parse(parsedIso);
    if (Number.isFinite(fromIso)) return fromIso;
  }

  const remain = toNumberOrNull(remainingMs);
  if (remain != null && remain > 0) {
    return Date.now() + remain;
  }
  return null;
}

export function mapHomeDashboardToViewModel(
  raw: HomeDashboardSuccessResponse | null | undefined,
): HomeDashboardViewModel {
  const heroBannerRaw = raw?.heroBanner;
  const heroBanner =
    heroBannerRaw && typeof heroBannerRaw === "object"
      ? mapBannerItem(heroBannerRaw, "hero")
      : null;

  const banners = Array.isArray(raw?.banners)
    ? raw.banners.map((item, idx) => mapBannerItem(item, `banner-${idx}`))
    : [];

  const flashSaleRaw = raw?.flashSale;
  const flashSale =
    flashSaleRaw && typeof flashSaleRaw === "object"
      ? {
          title: toSafeText(flashSaleRaw.title) ?? "Flash Sale",
          endsAtMs: parseEndsAtMs(
            flashSaleRaw.endsAt,
            flashSaleRaw.remainingMs,
          ),
          items: Array.isArray(flashSaleRaw.items)
            ? flashSaleRaw.items.map(mapFlashSaleItem)
            : [],
        }
      : null;

  const rankingRaw = raw?.rankingTryout;
  const rankingTryout =
    rankingRaw && typeof rankingRaw === "object"
      ? (() => {
          const byCategory: Record<string, HomeRankingRowViewModel[]> = {};
          const columnsByCategory: Record<string, string[]> = {};
          const tabsFromApi = Array.isArray(rankingRaw.tabs)
            ? rankingRaw.tabs.filter((tab) => typeof tab === "string")
            : [];
          const payloadCategories = Object.keys(rankingRaw).filter(
            (key) => key !== "activeCategory" && key !== "tabs",
          );

          for (const categoryKey of payloadCategories) {
            const value = rankingRaw[categoryKey];
            const normalizedCategoryKey = categoryKey.toLowerCase();
            const { columns, rows } = mapRankingCategory(value);
            columnsByCategory[normalizedCategoryKey] = columns;
            byCategory[normalizedCategoryKey] = rows;
          }

          const stableTabs =
            tabsFromApi.length > 0
              ? tabsFromApi
              : payloadCategories.map((key) => key.toUpperCase());
          const activeFromApi =
            toSafeText(rankingRaw.activeCategory) ?? stableTabs[0];
          const activeCategory = stableTabs.includes(activeFromApi)
            ? activeFromApi
            : stableTabs[0];

          for (const tab of stableTabs) {
            const normalizedTab = tab.toLowerCase();
            if (!Array.isArray(byCategory[normalizedTab])) {
              byCategory[normalizedTab] = [];
            }
            if (!Array.isArray(columnsByCategory[normalizedTab])) {
              columnsByCategory[normalizedTab] = [];
            }
          }

          return {
            activeCategory,
            tabs: stableTabs,
            byCategory,
            columnsByCategory,
          };
        })()
      : null;

  return {
    heroBanner,
    banners,
    flashSale,
    rankingTryout,
  };
}
