export type SearchResult = {
  id: string
  type: 'Matter' | 'Task' | 'Bill'
  title: string
  subtitle: string
  status?: string
  route: string
}
