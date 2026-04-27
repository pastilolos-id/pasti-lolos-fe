"use client";

import { useMemo, useState } from "react";
import { FilterSelect, type FilterType } from "@/components";
import { mockActivities } from "./data";
import MaterialCard from "./MaterialCard";
import TryoutCard from "./TryoutCard";

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<FilterType>("semua");

  const filteredActivities = useMemo(() => {
    if (filter === "semua") {
      return mockActivities;
    }
    return mockActivities.filter((activity) => {
      if (filter === "tryout") return activity.type === "tryout";
      if (filter === "materi") return activity.type === "materi";
      return true;
    });
  }, [filter]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h1 className="text-h4 font-bold text-neutral-6">Aktivitas Belajar</h1>

        <FilterSelect value={filter} onChange={setFilter} />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-[#F6F6F6] rounded-3xl p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) =>
              activity.type === "tryout" ? (
                <TryoutCard key={activity.id} activity={activity} />
              ) : (
                <MaterialCard key={activity.id} activity={activity} />
              ),
            )
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">
                Tidak ada aktivitas untuk filter ini
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
