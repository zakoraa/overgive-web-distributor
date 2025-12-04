"use client";

import SearchInput from "@/core/components/ui/search/search-input";
import AssignmentList from "./assignment-list";
import { useRef } from "react";
import useInfiniteScroll from "../hooks/use-infinite-scroll";
import { useCampaignAssignment } from "../providers/campaign-assignment-provider";

export default function AssignmentBody() {
  const {  loading, loadMore, hasMore } = useCampaignAssignment();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Active infinite scroll (ganti seluruh useEffect manual)
  useInfiniteScroll({
    ref: scrollRef,
    loading,
    hasMore,
    onLoadMore: loadMore,
    offset: 200,
  });

  return (
    <section
      ref={scrollRef}
      className="container space-y-4 overflow-x-scroll rounded-xl border border-gray-300 bg-white py-5 sm:overflow-x-hidden"
    >
      <div className="mx-3 flex items-center justify-between gap-10">
        <SearchInput placeholder="Cari nama kampanye..." />
      </div>

      <AssignmentList />
    </section>
  );
}
