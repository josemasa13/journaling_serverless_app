import * as uuid from 'uuid'

import { JournalItem } from '../models/JournalItem'
import { JournalItemsAccess } from '../dataLayer/journalItemsAcess'
import { CreateJournalItemRequest } from '../requests/CreateJournalItemRequest'
import { UpdateJournalItemRequest } from '../requests/UpdateJournalItemRequest'
// import { parseUserId } from '../auth/utils'

const journalAccess = new JournalItemsAccess()

export async function getAllJournalItems(userId: string): Promise<JournalItem[]> {
  return journalAccess.getAllJournalItems(userId)
}

export async function createJournalItem(
    createTodoRequest: CreateJournalItemRequest,
    userId: string
): Promise<JournalItem> {

  const itemId = uuid.v4()

  return await journalAccess.CreateJournalItem({
        journalItemId: itemId,
        userId: userId,
        content: createTodoRequest.content,
        dueDate: createTodoRequest.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
  })
}

export async function deleteTodo(journalItemId: string): Promise<void> {
    const todo = await journalAccess.getTodo(journalItemId);
    await journalAccess.deleteTodo(todo.userId, todo.createdAt);
}

export async function UpdateJournalItem(journalItemId: string, UpdateJournalItemRequest: UpdateJournalItemRequest): Promise<void> {
    const todo = await journalAccess.getTodo(journalItemId);
    await journalAccess.UpdateJournalItem(todo.userId, todo.createdAt, UpdateJournalItemRequest);
}

export async function setAttachmentUrl(journalItemId: string,attachmentUrl: string,): Promise<void> {
  const todo = await journalAccess.getTodo(journalItemId);

  await journalAccess.setAttachmentUrl(todo.userId, todo.createdAt, attachmentUrl);
}