# Serverless Journaling app


# Functionality of the application

This application will allow creating/updating/fetching journaling items. Each journaling item can optionally have an attachment image. Each user only has access to his/her journaling items.

# Journaling items

The application stores journaling items, and each journaling item contains the following fields:

* `journalItemId` (string) - a unique id for an item
* `userId` (string) - the user id of the journal entry creator
* `createdAt` (string) - date and time when an item was created
* `content` (string) - The content written for the journal entry
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to the journaling item


# Implemented functions

The following functions were implemented and configured in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.

* `GetJournalItems` - should return all journal entries for a current user

It returns data that looks like this:

```json
{
  "items": [
    {
      "journalItemId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "content": "This was an amazing day",
      "attachmentUrl": "http://example.com/image.png",
      "userId": "google-oauth2|111780691257890561140"
    },
    {
      "journalItemId": "123",
      "createdAt": "2019-07-28T20:01:45.424Z",
      "content": "Dear diary...",
      "attachmentUrl": "http://example.com/image.png",
      "userId": "google-oauth2|111780691257890561140"
    }
  ]
}
```

* `CreateJournalItem` - should create a new journal entry for the current user. 

It receives a new journaling item in JSON format that looks like this:

```json
{
  "createdAt": "2019-07-27T20:01:45.424Z",
  "content": "Dear diary...",
  "done": false,
  "attachmentUrl": "http://example.com/image.png",
  "userId": "google-oauth2|111780691257890561140"
}
```

It should return a new journaling item that looks like this:

```json
{
  "item": {
    "journalItemId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "content": "Dear diary...",
    "attachmentUrl": "http://example.com/image.png"
  }
}
```
The attachment URL is optional

* `UpdateJournalItem` - updates a journal entry created by a current user. 

It receives an object that contains one field that can be updated in the entry:

```json
{
  "content": "Hello diary",
}
```

The id of the entry that should be updated is passed as a URL parameter.

It should return an empty body.


* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a journal entry.

It returns a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

## Authentication

Authentication was created using your Auth0 application. To test the api it is necessary to have a token (provided by me at the moment). The authentication was implemented using asymmetrically encrypted JWT tokens.
```

```

# How to run the application

## Postman collection

The easiest way to test the API is using Postman, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

Click on the import button:

![Alt text](images/import-collection-1.png?raw=true "Image 1")


Click on the "Choose Files":

![Alt text](images/import-collection-2.png?raw=true "Image 2")


Select a file to import:

![Alt text](images/import-collection-3.png?raw=true "Image 3")


The variables (apiId and authToken are provided in the collection variables already, so there's no need to modify those)