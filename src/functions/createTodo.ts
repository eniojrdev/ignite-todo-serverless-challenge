import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoDbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document
    .put({
      TableName: "todos",
      Item: {
        id: uuidv4(),
        user_id,
        title,
        deadline: new Date(deadline).getTime(),
        created_at: new Date().getTime(),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: "",
  };
};
