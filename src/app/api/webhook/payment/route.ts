//import { NextRequest } from "next/server";
//import { headers } from "next/headers";

import type { Readable } from "node:stream";
import type { NextApiRequest, NextApiResponse } from "next";
const Chip = require("Chip").default;
// Get raw body as string


//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

// async function getRawBody(readable: Readable): Promise<Buffer> {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

export async function POST(request: Request, response: Response) {
  try {
    const rawBody = await request.text()
    //const rawBody = await getRawBody(request as any);
    //const {rawBody} = request as any;
    //const { headers } = request;
    //const parsed = JSON.parse(rawBody);
    const parsed = JSON.parse(rawBody);

    //const xsignature = headers["x-signature"];
    //const xsignature = (headers as any)["x-signature"];
    const xsignature = request.headers.get("x-signature");
    //const xSignature = request.headers['x-signature'];
    


    const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

    // const verified = apiInstance.verify(
    //   rawBody,
    //   Buffer.from(xsignature as any, "base64"),
    //   publicKey
    // );

    // console.log("/webhook/payment EVENT: ", parsed.event_type);
    // console.log("/webhook/payment VERIFIED: ", verified);
    if (xsignature !== null) {
      const verified = apiInstance.verify(
        rawBody,
        Buffer.from(xsignature, "base64"),
        publicKey
      );
      console.log("/webhook/payment EVENT: ", parsed.event_type);
      console.log("/webhook/payment VERIFIED: ", verified);
      console.log("i want see how signature looks like ===>",  xsignature);
      console.log("love to see what inside parse ===>", parsed);
      console.log("love to see what inside rawBody ===>", rawBody);
      

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





