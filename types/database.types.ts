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
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          start_date: string
          end_date: string | null
          location: string | null
          image_url: string | null
          status: string
          category: string | null
          price: number | null
          url: string | null
          artist_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          start_date: string
          end_date?: string | null
          location?: string | null
          image_url?: string | null
          status?: string
          category?: string | null
          price?: number | null
          url?: string | null
          artist_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          start_date?: string
          end_date?: string | null
          location?: string | null
          image_url?: string | null
          status?: string
          category?: string | null
          price?: number | null
          url?: string | null
          artist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          }
        ]
      }
      artists: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          bio: string | null
          image_url: string | null
          website: string | null
          social_media: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          bio?: string | null
          image_url?: string | null
          website?: string | null
          social_media?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          bio?: string | null
          image_url?: string | null
          website?: string | null
          social_media?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          email: string | null
          is_admin: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          is_admin?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          is_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'] 