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
        createdAt: new Date().toISOString()
  })
}
export async function UpdateJournalItem(journalItemId: string, UpdateJournalItemRequest: UpdateJournalItemRequest): Promise<void> {
    const journalItem = await journalAccess.getJournalItem(journalItemId);
    await journalAccess.UpdateJournalItem(journalItem.userId, journalItem.createdAt, UpdateJournalItemRequest);
}

export async function setAttachmentUrl(journalItemId: string,attachmentUrl: string,): Promise<void> {
  const journalItem = await journalAccess.getJournalItem(journalItemId);

  await journalAccess.setAttachmentUrl(journalItem.userId, journalItem.createdAt, attachmentUrl);
}