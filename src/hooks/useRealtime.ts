import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type RealtimeSubscription = {
  tableName: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
};

export function useRealtime<T = any>(
  subscription: RealtimeSubscription,
  callback: (payload: T) => void
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const { tableName, event, filter } = subscription;
    
    // Create a new real-time channel
    const newChannel = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table: tableName,
          ...(filter ? { filter } : {}),
        },
        (payload) => callback(payload.new as T)
      )
      .subscribe();

    setChannel(newChannel);

    // Cleanup subscription on unmount
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [subscription, callback]);

  return channel;
} 