"use client";

import { useMemo, useState } from "react";
import { FilterSelect, type FilterType } from "@/components";
import { Card } from "@/components/ui/card";
import { useGetStudentActivitiesQuery } from "@/lib/redux/api/studentsActivityApi";
import { mapStudentActivitiesResponseToActivities } from "./mapActivityFromApi";
import MaterialCard from "./MaterialCard";
import TryoutCard from "./TryoutCard";
import TryoutPackageCard from "./TryoutPackageCard";

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<FilterType>("semua");

  const { data, isLoading, isFetching, isError } =
    useGetStudentActivitiesQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const activities = useMemo(
    () => mapStudentActivitiesResponseToActivities(data?.data ?? []),
    [data],
  );

  const filteredActivities = useMemo(() => {
    if (filter === "semua") {
      return activities;
    }
    return activities.filter((activity) => {
      if (filter === "tryout") {
        return (
          activity.type === "tryout" || activity.type === "tryout_package"
        );
      }
      if (filter === "materi") return activity.type === "materi";
      return true;
    });
  }, [activities, filter]);

  const isInitialLoading = isLoading || (isFetching && !data);

  const renderListBody = () => {
    if (isInitialLoading) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">Memuat aktivitas...</p>
        </Card>
      );
    }

    if (isError) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">
            Gagal memuat aktivitas. Coba lagi nanti.
          </p>
        </Card>
      );
    }

    if (activities.length === 0) {
      return (
        <Card className="rounded-3xl border border-neutral-3 bg-white p-8 text-center shadow-none">
          <p className="text-neutral-5">
            {data?.message ?? "Belum ada aktivitas belajar."}
          </p>
        </Card>
      );
    }

    if (filteredActivities.length === 0) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">
            Tidak ada aktivitas untuk filter ini
          </p>
        </div>
      );
    }

    return filteredActivities.map((activity) =>
      activity.type === "tryout_package" ? (
        <TryoutPackageCard key={activity.id} activity={activity} />
      ) : activity.type === "tryout" ? (
        <TryoutCard key={activity.id} activity={activity} />
      ) : (
        <MaterialCard key={activity.id} activity={activity} />
      ),
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h1 className="text-h4 font-bold text-neutral-6">Aktivitas Belajar</h1>

        <FilterSelect value={filter} onChange={setFilter} />
      </div>

      <div className="flex-1 bg-[#F6F6F6] rounded-3xl p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col gap-3 sm:gap-4">{renderListBody()}</div>
      </div>
    </div>
  );
}
