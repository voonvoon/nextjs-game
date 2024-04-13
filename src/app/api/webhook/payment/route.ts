const Chip = require("Chip").default;

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

export async function POST(request: Request, response: Response) {
  try {
    const rawBody = await request.text();
    const parsed = JSON.parse(rawBody);
    const seeHeaders = request.headers;
    const xsignature = request.headers.get("x-signature");

    const publicKey = process.env.WEBHOOK_PUBLIC_KEY;
    if (xsignature !== null) {
      const verified = apiInstance.verify(
        rawBody,
        Buffer.from(xsignature, "base64"),
        publicKey
      );
      console.log("/webhook/payment EVENT ===> ", parsed.event_type);
      console.log("/webhook/payment VERIFIED ===> ", verified);
      console.log("i want see how signature looks like ===>", xsignature);
      console.log("love to see what inside parse ===>", parsed);
      console.log("love to see what inside rawBody ===>", rawBody);
      console.log("love to see what inside headers ===>", seeHeaders);
      
    } else {
      console.log("X-Signature header is null");
    }

    // Process the webhook payload
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    });
  }

  return new Response("Success123!", {
    status: 200,
  });
}
