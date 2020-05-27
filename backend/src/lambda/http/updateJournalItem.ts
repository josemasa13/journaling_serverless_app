import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { UpdateJournalItem } from "../../Logic/journalItems";
import { UpdateJournalItemRequest } from '../../requests/UpdateJournalItemRequest'
import { createLogger } from '../../utils/logger';

const logger = createLogger('uploadTodoUrl');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const journalItemId = event.pathParameters.journalItemId
    const updatedTodo: UpdateJournalItemRequest = JSON.parse(event.body)

    await UpdateJournalItem(journalItemId, updatedTodo)
    logger.info(`updating todo item with id ${journalItemId}`)

    return {
        statusCode: 204,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({})
    }

}