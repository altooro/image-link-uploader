import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { Construct } from "constructs";
import { Cors } from "aws-cdk-lib/aws-apigateway";

export class ImageHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this as any, "Handler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "main",
      entry: path.join(__dirname, "../resources/lambda.ts"),
      timeout: cdk.Duration.seconds(30),
    });

    new cdk.aws_apigateway.LambdaRestApi(this, "myapi", {
      handler: lambdaFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: ["*"],
        exposeHeaders: ["Access-Control-Allow-Origin"],
      },
    });
  }
}
