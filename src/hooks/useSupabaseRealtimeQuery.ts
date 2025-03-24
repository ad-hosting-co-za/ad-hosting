import { useEffect, useState, useCallback } from 'react';
import { RealtimeChannel, PostgrestFilterBuilder } from '@supabase/supabase-js';
import { supabase } from '@/supabase/client';
import type { Database } from '@/supabase/types';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

interface QueryOptions<T extends TableName> {
  // Query filters and options
  select?: string;
  filter?: (query: PostgrestFilterBuilder<Tables[T]>) => PostgrestFilterBuilder<Tables[T]>;
  limit?: number;
  page?: number;
  orderBy?: {
    column: keyof Tables[T]['Row'];
    ascending?: boolean;
  };
  
  // Realtime options
  realtimeEnabled?: boolean;
  events?: Array<'INSERT' | 'UPDATE' | 'DELETE'>;
  onDataChange?: (payload: {
    new: Tables[T]['Row'] | null;
    old: Tables[T]['Row'] | null;
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  }) => void;
}

export function useSupabaseRealtimeQuery<T extends TableName>(
  tableName: T,
  options: QueryOptions<T> = {}
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<number>(0);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build base query
      let query = supabase.from(tableName).select(
        options.select || '*',
        { count: 'exact' }
      );

      // Apply custom filters
      if (options.filter) {
        query = options.filter(query);
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(
          options.orderBy.column as string,
          { ascending: options.orderBy.ascending ?? true }
        );
      }

      // Apply pagination
      if (options.limit) {
        query = query.range(
          ((options.page || 0) * options.limit),
          ((options.page || 0) * options.limit) + options.limit - 1
        );
      }

      const { data: queryData, error: queryError, count: totalCount } = await query;

      if (queryError) throw queryError;
      
      setData(queryData || []);
      if (totalCount !== null) setCount(totalCount);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Query failed'));
    } finally {
      setLoading(false);
    }
  }, [tableName, options]);

  // Set up realtime subscription
  useEffect(() => {
    let subscription: RealtimeChannel | null = null;

    const setupRealtimeSubscription = async () => {
      if (!options.realtimeEnabled) return;

      try {
        // Initial data fetch
        await fetchData();

        // Set up realtime subscription
        subscription = supabase
          .channel(`realtime:${tableName}`)
          .on(
            'postgres_changes',
            {
              event: options.events || '*',
              schema: 'public',
              table: tableName
            },
            async (payload) => {
              // Notify callback if provided
              if (options.onDataChange) {
                options.onDataChange({
                  new: payload.new as Tables[T]['Row'],
                  old: payload.old as Tables[T]['Row'],
                  eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE'
                });
              }

              // Refresh data to ensure consistency
              await fetchData();
            }
          )
          .subscribe();

        setChannel(subscription);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Subscription failed'));
      }
    };

    setupRealtimeSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [tableName, options.realtimeEnabled, fetchData]);

  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const unsubscribe = useCallback(() => {
    if (channel) {
      supabase.removeChannel(channel);
      setChannel(null);
    }
  }, [channel]);

  return {
    data,
    error,
    loading,
    count,
    refresh,
    unsubscribe
  };
}

// Example usage:
/*
const {
  data: todos,
  loading,
  error,
  count,
  refresh
} = useSupabaseRealtimeQuery('todos', {
  select: '*, user:user_id(*)',
  filter: (query) => query
    .eq('status', 'active')
    .gte('created_at', '2024-01-01'),
  limit: 10,
  page: 0,
  orderBy: {
    column: 'created_at',
    ascending: false
  },
  realtimeEnabled: true,
  events: ['INSERT', 'UPDATE'],
  onDataChange: (payload) => {
    console.log('Data changed:', payload);
  }
});
*/ 