const Chip = require("Chip").default;
import { createOrder } from "@/libs/apis";

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

const testProductCreate = [
  {
    _id: "testid123456",
    name: "testNameOnly",
    images: [],
    quantity: 121,
    maxQuantity: 121,
    price: 121,
  },
  {
    _id: "testid22123456",
    name: "testName2Only",
    images: [],
    quantity: 122,
    maxQuantity: 122,
    price: 122,
  },
];

export async function POST(request: Request, response: Response) {
  try {
    const rawBody = await request.text(); // get the rawbody jz like this in nextjs , unlike need to make middleware in express
    const parsed = JSON.parse(rawBody);
    //const seeHeaders = request.headers;
    const xsignature = request.headers.get("x-signature");
    const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

    if (xsignature !== null) {
      //const curiousBuffer = Buffer.from(xsignature, "base64") //curious see what inside
      const verified = apiInstance.verify(
        //it'll return true/false
        rawBody, // it use rawBody here not parsed
        Buffer.from(xsignature, "base64"), //decodes the base64-encoded string stored in xsignature into its binary representation
        publicKey
      );
      console.log("/webhook/payment EVENT ===> ", parsed.event_type);
      console.log("/webhook/payment VERIFIED ===> ", verified);
      console.log("i want see how signature looks like ===>", xsignature);
      console.log("love to see what inside parse ===>", parsed);
      console.log("love to see what inside rawBody ===>", rawBody);
      //console.log("love to see what inside headers ===>", seeHeaders);
      //console.log("love to see what inside: Buffer.from(xsignature,`base64`) ===>", curiousBuffer);
    } else {
      console.log("X-Signature header is null");
    }

    // Process the webhook payload

    // Create order
    if (parsed.event_type === "purchase.paid") {
      createOrder(testProductCreate, "test@gmail.com");
      console.log("yay!order Created=====>", parsed.event_type);
    }
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    });
  }

  return new Response("Success123!", {
    status: 200,
  });
}
