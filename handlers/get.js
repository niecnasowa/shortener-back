const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const params = {
    TableName: "websites",
    Key: {
      id: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params).promise();

  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Couldn't find the todo item." }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    };
  }
};
