import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { JournalItem } from "../models/JournalItem";
import { UpdateJournalItemRequest } from '../requests/UpdateJournalItemRequest'

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class JournalItemsAccess {
  constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly journalItemsTable = process.env.JOURNAL_ITEMS_TABLE,
      private readonly indexName = process.env.INDEX_NAME
  ) {}

    async CreateJournalItem(todoItem: JournalItem): Promise<JournalItem> {
        await this.docClient.put({
            TableName: this.journalItemsTable,
            Item: todoItem
        }).promise()
        return todoItem;
    }

    async getAllJournalItems(userId: string): Promise<JournalItem[]> {
        const result = await this.docClient.query({
            TableName: this.journalItemsTable,
            KeyConditionExpression: 'userId= :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
          }).promise()

        return result.Items as JournalItem[];
    }

    async getJournalItem(id: string): Promise<JournalItem>{
        const result = await this.docClient.query({
            TableName: this.journalItemsTable,
            IndexName: this.indexName,
            KeyConditionExpression: 'journalItemId = :journalItemId',
            ExpressionAttributeValues:{
                ':journalItemId': id
            }
        }).promise()

        const item = result.Items[0];
        return item as JournalItem;
    }

    async UpdateJournalItem(userId:string, createdAt:string, updatedJournalItem:UpdateJournalItemRequest){
        await this.docClient.update({
            TableName: this.journalItemsTable,
            Key: {
                'userId': userId,
                'createdAt': createdAt,
            },
            UpdateExpression: "set content = :content",
            ExpressionAttributeValues: {
                ":content": updatedJournalItem.content,
            },
        }).promise()
    }

    public async setAttachmentUrl(userId: string, createdAt: string, attachmentUrl: string,): Promise<void> {
        await this.docClient.update({
            TableName: this.journalItemsTable,
            Key: {
                'userId': userId,
                'createdAt': createdAt,
            },
            UpdateExpression: "set attachmentUrl = :attachmentUrl",
            ExpressionAttributeValues: {
                ":attachmentUrl":attachmentUrl
            }
        }).promise()
    }

}