export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          updated_at: string | null
          created_at: string
          role: 'admin' | 'editor' | 'user'
          email: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string
          role?: 'admin' | 'editor' | 'user'
          email: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string
          role?: 'admin' | 'editor' | 'user'
          email?: string
        }
      }
      content: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: Json
          published: boolean
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: Json
          published?: boolean
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: Json
          published?: boolean
          author_id?: string
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 