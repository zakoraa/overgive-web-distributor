import { useEffect } from "react";

interface InfiniteScrollOptions {
  ref: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  offset?: number;
  disabled?: boolean;
}

export default function useInfiniteScroll({
  ref,
  loading,
  hasMore,
  onLoadMore,
  offset = 200,
  disabled = false,
}: InfiniteScrollOptions) {
  useEffect(() => {
    if (disabled) return;

    const el = ref.current;
    if (!el) return;

    const handler = () => {
      if (loading || !hasMore) return;

      const nearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - offset;

      if (nearBottom) onLoadMore();
    };

    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [ref, loading, hasMore, onLoadMore, offset, disabled]);
}
