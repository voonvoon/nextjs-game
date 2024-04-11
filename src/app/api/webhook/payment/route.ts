import type { Readable } from "node:stream";
import type { NextApiRequest, NextApiResponse } from "next";
const Chip = require("Chip").default;
// Get raw body as string

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request, response: Response) {
  try {
    //const text = await request.text()
    const rawBody = await getRawBody(request as any);
    console.log("raw body for this request is:", rawBody);
    const { headers } = request;
    //const parsed = JSON.parse(rawBody);
    const parsed = JSON.parse(rawBody.toString());

    //const xsignature = headers["x-signature"];
    const xsignature = (headers as any)["x-signature"];

    const publicKey = process.env.webhookPublicKey;

    const verified = apiInstance.verify(
      rawBody,
      Buffer.from(xsignature as string, "base64"),
      publicKey
    );

    console.log("/webhook/payment EVENT: ", parsed.event_type);
    console.log("/webhook/payment VERIFIED: ", verified);

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
