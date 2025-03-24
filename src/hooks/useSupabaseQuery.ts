import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/supabase/client';
import type { Database } from '@/supabase/types';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

export function useSupabaseQuery<T extends TableName>(
  tableName: T,
  query: (table: ReturnType<typeof supabase.from>) => Promise<{
    data: Tables[T]['Row'][] | null;
    error: PostgrestError | null;
  }>,
  deps: any[] = []
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await query(supabase.from(tableName));
        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, error, loading };
}

// Example usage:
// const { data, error, loading } = useSupabaseQuery(
//   'profiles',
//   (table) => table.select('*').eq('id', userId),
//   [userId]
// ); 