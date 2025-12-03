"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { CampaignAssignment } from "../types/campaign-assignment";
import { getCampaignAssignments } from "../services/get-campaign-assignments";

interface ProviderProps {
  children: ReactNode;
}

interface ContextType {
  items: CampaignAssignment[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  search: string;
  setSearch: (v: string) => void;
  filtered: CampaignAssignment[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export const CampaignAssignmentContext = createContext<ContextType | null>(
  null,
);

export const CampaignAssignmentProvider = ({ children }: ProviderProps) => {
  const [items, setItems] = useState<CampaignAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const LIMIT = 10;

  const [search, setSearch] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await getCampaignAssignments({
      limit: LIMIT,
      offset,
    });

    if (res.length === 0) {
      setHasMore(false);
    }

    setItems((prev) => [...prev, ...res]);
    setOffset((prev) => prev + LIMIT);

    setLoading(false);
  }, [loading, hasMore, offset]);

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  // LOAD PERTAMA
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <CampaignAssignmentContext.Provider
      value={{
        items,
        loading,
        hasMore,
        loadMore,
        search,
        setSearch,
        filtered,
        scrollRef,
      }}
    >
      {children}
    </CampaignAssignmentContext.Provider>
  );
};

export const useCampaignAssignment = () => {
  const ctx = useContext(CampaignAssignmentContext);
  if (!ctx) throw new Error("Provider missing");
  return ctx;
};
