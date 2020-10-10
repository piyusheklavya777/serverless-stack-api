import * as uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function main (event, context, callback) {
    const data = JSON.parse(event.body);
    // now we got the data, construct a params object to pass to dynamoDB put call
    const params = {
        TableName : process.env.tableName,
        Item : {
            userId : event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    dynamoDB.put(params, (err, data) => {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };

        if(err) {
            const response = {
                statusCode: 500,
                headers : headers,
                body: JSON.stringify({status: false})
            };
            callback(null, response);
            return;
        }

        const response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(JSON.stringify(params.Item))
        };
        callback(null, response);
    });
}