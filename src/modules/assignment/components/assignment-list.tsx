"use client";

import { useState } from "react";
import { AssignmentCard } from "./assignment-card";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useCampaignAssignment } from "../providers/campaign-assignment-provider";

export default function AssignmentList() {
  const { assignments, loading, loadMore, hasMore } = useCampaignAssignment();

  return (
    <div>
      {/* LOADING AWAL */}
      {loading && assignments.length === 0 ? (
        <CircularLoading />
      ) : (
        <>
          {/* MOBILE */}
          <div className="flex flex-col gap-3 px-3 sm:hidden">
            {assignments.map((item) => (
              <AssignmentCard key={item.id} item={item} />
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden grid-cols-2 gap-2 px-3 sm:grid md:grid-cols-3 lg:grid-cols-5">
            {assignments.map((item) => (
              <AssignmentCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* LOADING SAAT SCROLL */}
      {loading && assignments.length > 0 && (
        <div className="py-4">
          <CircularLoading />
        </div>
      )}
    </div>
  );
}
