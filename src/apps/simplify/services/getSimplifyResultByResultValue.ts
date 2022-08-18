// aws
import AWS from 'aws-sdk';

// thirdparty
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getSimplifyResultByResultValue(value: number) {
    let result;

    try {
        const resultValue = await dynamodb
            .get({
                TableName: process.env.SIMPLIFY_RESULTS_TABLE_NAME as string,
                Key: { result: value },
            })
            .promise();

        result = resultValue.Item;
    } catch (error) {
        console.error(error);
       result=null;
    }

   
    return result;
}
