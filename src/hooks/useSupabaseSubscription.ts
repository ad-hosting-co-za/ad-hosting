import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/supabase/client';
import type { Database } from '@/supabase/types';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

interface SubscriptionOptions<T extends TableName> {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  callback?: (payload: {
    new: Tables[T]['Row'] | null;
    old: Tables[T]['Row'] | null;
  }) => void;
}

export function useSupabaseSubscription<T extends TableName>(
  tableName: T,
  options: SubscriptionOptions<T> = {}
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    let subscription: RealtimeChannel;

    const setupSubscription = async () => {
      try {
        // Initial data fetch
        const { data: initialData, error: fetchError } = await supabase
          .from(tableName)
          .select('*');

        if (fetchError) throw fetchError;
        setData(initialData || []);

        // Set up real-time subscription
        subscription = supabase
          .channel(`public:${tableName}`)
          .on(
            'postgres_changes',
            {
              event: options.event || '*',
              schema: 'public',
              table: tableName,
              ...(options.filter ? { filter: options.filter } : {})
            },
            (payload) => {
              if (options.callback) {
                options.callback(payload);
                return;
              }

              // Default handling if no callback provided
              setData(currentData => {
                switch (payload.eventType) {
                  case 'INSERT':
                    return [...currentData, payload.new as Tables[T]['Row']];
                  case 'UPDATE':
                    return currentData.map(item => 
                      item.id === payload.new.id ? payload.new : item
                    );
                  case 'DELETE':
                    return currentData.filter(item => item.id !== payload.old.id);
                  default:
                    return currentData;
                }
              });
            }
          )
          .subscribe();

        setChannel(subscription);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Subscription error'));
      }
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [tableName, options.event, options.filter]);

  const unsubscribe = () => {
    if (channel) {
      supabase.removeChannel(channel);
      setChannel(null);
    }
  };

  return { data, error, unsubscribe };
}

// Example usage:
// const { data, error } = useSupabaseSubscription('profiles', {
//   event: 'UPDATE',
//   filter: 'id=eq.123',
//   callback: (payload) => console.log('Profile updated:', payload)
// }); 