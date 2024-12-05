import { DynamoDBClient, GetItemCommand, GetItemInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> => {
  const params: GetItemInput = {
    TableName: 'aws-cdk-study-dev-table8235A42E-1P6XWPTZT386T',
    Key: {
      id: { S: '1' },
    },
  };
  const client = DynamoDBDocumentClient.from((new DynamoDBClient({})));
  const result = await client.send(new GetItemCommand(params));

  console.log('result:', result);

  console.log('Hello, world!');
  console.log('event:', event);
  console.log('context:', context);
  return {
    statusCode: 200,
    body: JSON.stringify('Hello, world!'),
  };
};