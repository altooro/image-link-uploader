import axios from "axios";

exports.main = async (event: any, context: any) => {
  try {
    if (!event.queryStringParameters) {
      return {
        statusCode: 400,
        body: "Url is required",
      };
    }

    const { url } = event.queryStringParameters;

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify("error"),
      };
    }

    const res = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const myBuffer = Buffer.from(res.data).toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: myBuffer,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
