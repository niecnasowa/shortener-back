const shortid = require('shortid');
const AWS = require("aws-sdk");
const get = require('lodash.get');

const client = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const body = JSON.parse(get(event, 'body'));
  const url = get(body, 'url');

  if(!url) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: 'No url' }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    };
  }

  const id = shortid.generate();

  const params = {
    TableName: "websites",
    Item: {
      id,
      website: url,
    }
  };

  await client.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ url, id }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  };
};
