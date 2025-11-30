"use client";

import SearchInput from "@/core/components/ui/search/search-input";

export default function AssignmentBody() {
  return (
    <section className="container space-y-4 overflow-x-scroll rounded-xl border border-gray-300 bg-white py-5 sm:overflow-x-hidden">
      <div className="mx-3 flex items-center justify-between gap-10">
        <SearchInput placeholder="Cari nama kampanye..." />
      </div>

      
    </section>
  );
}
