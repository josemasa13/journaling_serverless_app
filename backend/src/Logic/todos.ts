import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateJournalItemRequest } from '../requests/UpdateJournalItemRequest'
// import { parseUserId } from '../auth/utils'

const todoAccess = new TodosAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodos(userId)
}

export async function CreateJournalItem(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {

  const itemId = uuid.v4()

  return await todoAccess.CreateJournalItem({
        journalItemId: itemId,
        userId: userId,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
  })
}

export async function deleteTodo(journalItemId: string): Promise<void> {
    const todo = await todoAccess.getTodo(journalItemId);
    await todoAccess.deleteTodo(todo.userId, todo.createdAt);
}

export async function UpdateJournalItem(journalItemId: string, UpdateJournalItemRequest: UpdateJournalItemRequest): Promise<void> {
    const todo = await todoAccess.getTodo(journalItemId);
    await todoAccess.UpdateJournalItem(todo.userId, todo.createdAt, UpdateJournalItemRequest);
}

export async function setAttachmentUrl(journalItemId: string,attachmentUrl: string,): Promise<void> {
  const todo = await todoAccess.getTodo(journalItemId);

  await todoAccess.setAttachmentUrl(todo.userId, todo.createdAt, attachmentUrl);
}