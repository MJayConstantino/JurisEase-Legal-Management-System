export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      billings: {
        Row: {
          amount: string | null
          bill_id: string
          created_at: string
          name: string | null
          remarks: string | null
          status: string | null
        }
        Insert: {
          amount?: string | null
          bill_id?: string
          created_at?: string
          name?: string | null
          remarks?: string | null
          status?: string | null
        }
        Update: {
          amount?: string | null
          bill_id?: string
          created_at?: string
          name?: string | null
          remarks?: string | null
          status?: string | null
        }
        Relationships: []
      }
      matters: {
        Row: {
          assigned_attorney: string | null
          assigned_staff: string | null
          case_number: string
          client: string
          client_address: string | null
          client_email: string | null
          client_phone: string | null
          court: Json | null
          created_at: string
          date_closed: string | null
          date_opened: string
          description: string
          matter_id: string
          name: string
          opposing_council: Json | null
          status: Database["public"]["Enums"]["matter_status_enum"]
        }
        Insert: {
          assigned_attorney?: string | null
          assigned_staff?: string | null
          case_number: string
          client: string
          client_address?: string | null
          client_email?: string | null
          client_phone?: string | null
          court?: Json | null
          created_at?: string
          date_closed?: string | null
          date_opened: string
          description: string
          matter_id?: string
          name: string
          opposing_council?: Json | null
          status: Database["public"]["Enums"]["matter_status_enum"]
        }
        Update: {
          assigned_attorney?: string | null
          assigned_staff?: string | null
          case_number?: string
          client?: string
          client_address?: string | null
          client_email?: string | null
          client_phone?: string | null
          court?: Json | null
          created_at?: string
          date_closed?: string | null
          date_opened?: string
          description?: string
          matter_id?: string
          name?: string
          opposing_council?: Json | null
          status?: Database["public"]["Enums"]["matter_status_enum"]
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          matter_id: string | null
          name: string
          priority: Database["public"]["Enums"]["task_priority_enum"]
          status: Database["public"]["Enums"]["task_status_enum"]
          task_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          matter_id?: string | null
          name: string
          priority: Database["public"]["Enums"]["task_priority_enum"]
          status: Database["public"]["Enums"]["task_status_enum"]
          task_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          matter_id?: string | null
          name?: string
          priority?: Database["public"]["Enums"]["task_priority_enum"]
          status?: Database["public"]["Enums"]["task_status_enum"]
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["matter_id"]
          },
        ]
      }
      users: {
        Row: {
          user_email: string
          user_id: string
          user_name: string | null
        }
        Insert: {
          user_email: string
          user_id?: string
          user_name?: string | null
        }
        Update: {
          user_email?: string
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      users_matters: {
        Row: {
          matter_id: string
          user_id: string
        }
        Insert: {
          matter_id?: string
          user_id?: string
        }
        Update: {
          matter_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_matters_matter_id_fkey"
            columns: ["matter_id"]
            isOneToOne: false
            referencedRelation: "matters"
            referencedColumns: ["matter_id"]
          },
          {
            foreignKeyName: "users_matters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
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
      matter_status_enum: "open" | "closed" | "pending"
      task_priority_enum: "low" | "medium" | "high"
      task_status_enum: "pending" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
