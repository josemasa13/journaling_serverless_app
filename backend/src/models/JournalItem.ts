export interface JournalItem {
  userId: string
  journalItemId: string
  createdAt: string
  content: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
