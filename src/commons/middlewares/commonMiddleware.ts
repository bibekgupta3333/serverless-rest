// middy
import middy from '@middy/core';
import cors from '@middy/http-cors';
import errorLogger from '@middy/error-logger';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';

export default (handler: any) =>
    middy(handler).use([httpJsonBodyParser(), httpEventNormalizer(), httpErrorHandler(), errorLogger(), cors()]);
