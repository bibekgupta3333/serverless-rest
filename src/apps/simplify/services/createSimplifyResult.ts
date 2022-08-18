// aws
import AWS from 'aws-sdk';

// thirdparty
import createError from 'http-errors';

import cuid from 'cuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function createSimplifyResult(value: number) {
  const simplifyResult = {
    id: cuid(),
    result: value,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.SIMPLIFY_RESULTS_TABLE_NAME as string,
        Item: simplifyResult,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error as string);
  }

  return simplifyResult;
}
