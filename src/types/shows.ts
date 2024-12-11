export interface Show {
  id: string
  date: string
  time: string
  title: string
  venue: {
    name: string
    address: string
  }
  description: string
  ticketUrl: string
}

export interface ShowsContextType {
  shows: Show[]
  upcomingShows: Show[]
  pastShows: Show[]
  loading: boolean
  error: Error | null
} 