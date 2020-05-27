/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateJournalItemRequest {
  name: string
  dueDate: string
  done: boolean
}