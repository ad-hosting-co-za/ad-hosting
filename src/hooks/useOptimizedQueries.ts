import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface QueryOptions<T> {
  table: string;
  select?: string;
  filters?: {
    column: string;
    operator: string;
    value: any;
  }[];
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  page?: number;
}

interface QueryResult<T> {
  data: T[] | null;
  error: PostgrestError | null;
  loading: boolean;
  count: number;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useOptimizedQuery<T = any>(options: QueryOptions<T>): QueryResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(options.page || 1);

  const fetchData = async (isLoadMore = false) => {
    try {
      setLoading(true);
      
      // Build the query
      let query = supabase
        .from(options.table)
        .select(options.select || '*', { count: 'exact' });

      // Apply filters
      if (options.filters) {
        options.filters.forEach(filter => {
          query = query.filter(filter.column, filter.operator, filter.value);
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      // Apply pagination
      const from = (page - 1) * (options.limit || 10);
      const to = from + (options.limit || 10) - 1;
      query = query.range(from, to);

      const { data: result, error: queryError, count: totalCount } = await query;

      if (queryError) {
        throw queryError;
      }

      setData(isLoadMore && data ? [...data, ...result] : result);
      setCount(totalCount || 0);
      setHasMore(totalCount ? from + result.length < totalCount : false);
      setError(null);
    } catch (err) {
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [options.table, options.select, JSON.stringify(options.filters), JSON.stringify(options.orderBy)]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setPage(p => p + 1);
    await fetchData(true);
  };

  const refresh = async () => {
    setPage(1);
    await fetchData();
  };

  return {
    data,
    error,
    loading,
    count,
    hasMore,
    loadMore,
    refresh,
  };
} 