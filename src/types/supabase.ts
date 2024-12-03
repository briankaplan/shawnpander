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
      features: {
        Row: {
          id: string
          name: string
          description: string | null
          enabled: boolean
          environment: string
          is_experiment: boolean
          variant_distribution: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          enabled?: boolean
          environment?: string
          is_experiment?: boolean
          variant_distribution?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          enabled?: boolean
          environment?: string
          is_experiment?: boolean
          variant_distribution?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      feature_events: {
        Row: {
          id: string
          feature_id: string
          feature_name: string
          enabled: boolean
          environment: string
          user_id: string | null
          session_id: string
          timestamp: string
          variant: string | null
          experiment_id: string | null
        }
        Insert: {
          id?: string
          feature_id: string
          feature_name: string
          enabled: boolean
          environment: string
          user_id?: string | null
          session_id: string
          timestamp?: string
          variant?: string | null
          experiment_id?: string | null
        }
        Update: {
          id?: string
          feature_id?: string
          feature_name?: string
          enabled?: boolean
          environment?: string
          user_id?: string | null
          session_id?: string
          timestamp?: string
          variant?: string | null
          experiment_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      feature_variant: 'A' | 'B' | 'control'
    }
  }
} 