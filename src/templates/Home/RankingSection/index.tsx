"use client";

import { useMemo, useState } from "react";
import { Table } from "@/components";
import type { TableCoulmnType } from "@/components/Table/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import type {
  HomeRankingRowViewModel,
  HomeRankingViewModel,
} from "../mapHomeFromApi";

interface RankingSectionProps extends React.ComponentProps<"section"> {
  ranking: HomeRankingViewModel | null;
}

function toCategoryKey(tab: string) {
  return tab.trim().toLowerCase();
}

function buildColumns(
  rows: HomeRankingRowViewModel[],
  scoreColumns: string[],
): TableCoulmnType[] {
  const seenBaseKeys = new Set<string>();
  const baseKeys: string[] = [];

  for (const row of rows) {
    for (const key of Object.keys(row.raw)) {
      if (key.startsWith("scores.")) continue;
      if (seenBaseKeys.has(key)) continue;
      seenBaseKeys.add(key);
      baseKeys.push(key);
    }
  }

  const columns: TableCoulmnType[] = baseKeys.map((key) => ({
    accessorKey: key,
    title: key,
    textPosition: key === "name" ? "left" : "center",
  }));

  for (const scoreColumn of scoreColumns) {
    const accessorKey = `scores.${scoreColumn}`;
    columns.push({
      accessorKey,
      title: scoreColumn,
      textPosition: "center",
    });
  }

  return columns;
}

function normalizeRowsForTable(rows: HomeRankingRowViewModel[]) {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row.raw).map(([key, value]) => [key, value ?? "-"]),
    ),
  );
}

export default function RankingSection({
  ranking,
  className,
}: RankingSectionProps) {
  const tabs = ranking?.tabs.length ? ranking.tabs : ["BUMN", "CPNS"];
  const [activeTab, setActiveTab] = useState<string>(
    ranking?.activeCategory && tabs.includes(ranking.activeCategory)
      ? ranking.activeCategory
      : tabs[0],
  );
  const rowsByTab = ranking?.byCategory ?? {};
  const rankingColumnsByTab = ranking?.columnsByCategory ?? {};
  const columnsByTab = useMemo(() => {
    const result: Record<string, TableCoulmnType[]> = {};
    for (const tab of tabs) {
      const normalizedTab = toCategoryKey(tab);
      const rows = rowsByTab[normalizedTab] ?? [];
      const scoreColumns = rankingColumnsByTab[normalizedTab] ?? [];
      result[tab] = buildColumns(rows, scoreColumns);
    }
    return result;
  }, [tabs, rowsByTab, rankingColumnsByTab]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn(
        "order-1 md:order-2",
        "bg-[linear-gradient(180deg,#448AFF_0%,#25A0AB_50.96%,#25A0AB_100%)] rounded-3xl p-3",
        className,
      )}
    >
      <div className="bg-primary-5 rounded-b-3xl py-3 mb-3">
        <h2 className="text-white text-2xl w-full min-w-80 mx-auto font-bold text-center tracking-[0.4] mb-4">
          🏆 Ranking Tryout 🏆
        </h2>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => {
        const rowsRaw = rowsByTab[toCategoryKey(tab)] ?? [];
        const columns = columnsByTab[tab] ?? [];
        const rows = normalizeRowsForTable(rowsRaw);
        return (
          <TabsContent key={tab} value={tab}>
            {rowsRaw.length > 0 ? (
              <Table columns={columns} data={rows} />
            ) : (
              <p className="rounded-2xl bg-white p-4 text-center text-neutral-5">
                Belum ada data ranking.
              </p>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
