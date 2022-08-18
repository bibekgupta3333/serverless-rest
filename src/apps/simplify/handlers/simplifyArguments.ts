// thirdparty
import createError from 'http-errors';

// validator
import validator from '@middy/validator';

// schema
import { simplifyArgumentsInputSchema } from '../schemas';

// services
import { createSimplifyResult, getSimplifyResultByResultValue } from '../services';

// aws
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// middleware
import commonMiddleware from '../../../commons/middlewares/commonMiddleware';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

interface inputType {
    x: number;
    y: number;
    z: number;
}

export const simplifyArguments = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let simplifyResult;

    const { x, y, z } = (event.body as inputType) ?? { x: 0, y: 0, z: 0 };

    // validate input
    if (x && y && z && x > 0 && y > 0 && z > 0) {
        throw new createError.InternalServerError('X, Y, Z must be greater than one');
    }

    try {
        const calculatedResult = Math.ceil(x + y * z);
        simplifyResult = await getSimplifyResultByResultValue(calculatedResult);

        if (simplifyResult) {
            simplifyResult = await createSimplifyResult(calculatedResult);
        }
    } catch (err) {
        console.error(err);
        throw new createError.InternalServerError(err as string);
    }

    return {
        statusCode: 201,
        body: JSON.stringify(simplifyResult),
    };
};

export const handler = commonMiddleware(simplifyArguments).use(
    validator({
        inputSchema: simplifyArgumentsInputSchema,
    }),
);
