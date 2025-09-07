// Kanban Data
type Member = { name: string, img: string }

export type KanbanItem = {
  id: number
  title: string
  comments?: string
  dueDate?: string
  labels?: string[]
  members?: Member[]
  attachments?: number
  commentsCount?: number
  image?: string
}
export type KanbanBoard = {
  id: number
  title: string
  itemsIds: number[]
}

export type RenameKanbanBoard = {
  oldName: string
  boardId: number
  newName: string
}

export type AddNewKanbanItem = {
  itemTitle: string
  boardName: string
  boardId: number
}

export type EditKanbanItem = {
  item: KanbanItem | undefined
  boardName: string
  boardId: number
}

export type KanbanData = {
  boards: KanbanBoard[]
  items: KanbanItem[]
}

export type KanbanState = {
  ids: number[]
  boardId: number
}
