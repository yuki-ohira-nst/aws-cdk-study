import path from 'path';
import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const table = new dynamo.Table(this, 'table', {
      partitionKey: { name: 'id', type: dynamo.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
    });

    const func = new NodejsFunction(this, 'hello-world', {
      entry: path.join(__dirname, 'lambda/hello-world.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_LATEST,
      logRetention: RetentionDays.THREE_MONTHS,
    });
    table.grantReadData(func);
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'aws-cdk-study-dev', { env: devEnv });
// new MyStack(app, 'aws-cdk-study-prod', { env: prodEnv });

app.synth();