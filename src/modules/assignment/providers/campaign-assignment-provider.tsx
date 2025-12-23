"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CampaignAssignment } from "../types/campaign-assignment";
import { getCampaignAssignments } from "../services/get-campaign-assignments";

interface CampaignAssignmentContextType {
  assignments: CampaignAssignment[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  loadMore: () => void;
  hasMore: boolean;
  refresh: () => void;
}

const CampaignAssignmentContext = createContext<
  CampaignAssignmentContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function CampaignAssignmentProvider({ children }: Props) {
  const [assignments, setAssignments] = useState<CampaignAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  // Ambil data awal dan saat search berubah
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setOffset(0);

      try {
        const data = await getCampaignAssignments({ limit, offset: 0, search });
        setAssignments(data);
        setHasMore(data.length === limit);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  // Load more untuk infinite scroll
  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextOffset = offset + limit;
      const data = await getCampaignAssignments({
        limit,
        offset: nextOffset,
        search,
      });
      setAssignments((prev) => [...prev, ...data]);
      setOffset(nextOffset);
      setHasMore(data.length === limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setSearch(""); // Reset search
  };

  return (
    <CampaignAssignmentContext.Provider
      value={{
        assignments,
        loading,
        search,
        setSearch,
        loadMore,
        hasMore,
        refresh,
      }}
    >
      {children}
    </CampaignAssignmentContext.Provider>
  );
}

export function useCampaignAssignment() {
  const context = useContext(CampaignAssignmentContext);
  if (!context) {
    throw new Error(
      "useCampaignAssignment harus digunakan di dalam CampaignAssignmentProvider",
    );
  }
  return context;
}
