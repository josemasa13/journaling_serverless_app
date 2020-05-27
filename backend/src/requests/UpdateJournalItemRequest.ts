/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateJournalItemRequest {
  content: string
  dueDate: string
  done: boolean
}