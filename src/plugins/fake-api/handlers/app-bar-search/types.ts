export type SearchItem = {
  url: object
  icon: string
  title: string
}

export type SearchResults = {
  title: string
  category: string
  children: SearchItem[]
}
