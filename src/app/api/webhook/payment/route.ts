// // pages/api/webhook/payment.js
// import { createOrder } from "@/libs/apis";
// const Chip = require("Chip").default;

// // Chip set up
// Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
// Chip.ApiClient.instance.token = process.env.API_KEY;
// const apiInstance = new Chip.PaymentApi();

// const test = [
//   {
//     _id: "testid",
//     name: "testNamehaha",
//     images: [],
//     quantity: 121,
//     maxQuantity: 121,
//     price: 121,
//   },
// ];

// // Middleware function to handle raw body..
// function rawBodyMiddleware(req: any, res: any, next: any) {
//   let rawBody = "";
//   req.setEncoding("utf8");

//   req.on("data", function (chunk: any) {
//     if (chunk) rawBody += chunk;
//   });

//   req.on("end", function () {
//     req.rawBody = rawBody;
//     next();
//   });
// }

// export async function POST(req: any, res: any) {
//   //nextjs convention , handle incoming req
//   if (req.method === "POST") {
//     rawBodyMiddleware(req, res, async function () {
//       const { rawBody, headers } = req;
//       const parsed = JSON.parse(rawBody);
//       const xsignature = headers["x-signature"];
//       const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

//       const verified = apiInstance.verify(
//         rawBody,
//         Buffer.from(xsignature, "base64"),
//         publicKey
//       );
//       console.log("/webhook/payment EVENT===========>: ", parsed.event_type);
//       console.log("/webhook/payment VERIFIED=============>: ", verified);

//       // Create order
//       createOrder(test, "test@gmail.com");

//       // You can add logic to update db qty here

//       res.end("WEBHOOK OK!");
//     });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// pages/api/webhook/payment.js
// import { createOrder } from "@/libs/apis";
// const Chip = require("Chip").default;

// // Chip set up
// Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
// Chip.ApiClient.instance.token = process.env.API_KEY;
// const apiInstance = new Chip.PaymentApi();

// const test = [
//   {
//     _id: "testid",
//     name: "testNamehaha",
//     images: [],
//     quantity: 121,
//     maxQuantity: 121,
//     price: 121,
//   },
// ];

// export async function POST(req: any, res: any) {
//   if (req.method === "POST") {
//     const { body, headers } = req;
//     const xsignature = headers["x-signature"];
//     const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

//     // Verify signature
//     const verified = apiInstance.verify(
//       JSON.stringify(body),
//       Buffer.from(xsignature, "base64"),
//       publicKey
//     );
//     console.log("/webhook/payment EVENT===========>: ", body?.event_type);
//     console.log("/webhook/payment VERIFIED=============>: ", verified);

//     // Create order
//     createOrder(test, "test@gmail.com");

//     // You can add logic to update db qty here

//     res.end("WEBHOOK OK!");
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
// File: `pages/api/webhooks/someProvider.ts`

// File: `pages/api/webhooks/someProvider.ts`

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Readable } from 'node:stream';

// EXPORT config to tell Next.js NOT to parse the body
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const rawBody = await getRawBody(req);
  console.log('raw body for this request is:', rawBody);

  const data = JSON.parse(Buffer.from(rawBody).toString('utf8'));
  console.log('json data for this request is:', data);

  res.send('Got raw body!');
}