export type Billing = {
  amount?: string | null
  bill_id: string //this is a uuid
  created_at: string
  matter_id?: string | null // this is an FK UUID
  name: string | null
  remarks?: string | null
  status?: string | null
}
