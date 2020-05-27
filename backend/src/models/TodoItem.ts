export interface TodoItem {
  userId: string
  journalItemId: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
