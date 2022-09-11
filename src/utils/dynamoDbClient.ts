import { DynamoDB } from "aws-sdk";

const isOffine = process.env.IS_OFFLINE;

export const document = isOffine
  ? new DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "x",
      secretAccessKey: "x",
    })
  : new DynamoDB.DocumentClient();
