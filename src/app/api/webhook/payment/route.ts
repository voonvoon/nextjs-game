import { NextResponse } from "next/server";
import { createOrder, updateGameQuantity } from "@/libs/apis";
const Chip = require("Chip").default;

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

// Middleware function to handle raw body..
function rawBodyMiddleware(req: any, res: any, next: any) {
  let rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk: any) {
    if (chunk) rawBody += chunk;
  });

  req.on("end", function () {
    req.rawBody = rawBody;
    next();
  });
}

const test = [
  {
    _id: "testid",
    name: "testName",
    images: [],
    quantity: 121,
    maxQuantity: 121,
    price: 121,
  },
];

export async function POST(req: any, res: any) {
  rawBodyMiddleware(req, res, async function () {
    const { rawBody, headers } = req;
    const parsed = JSON.parse(rawBody);
    const xsignature = headers["x-signature"];
    const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

    const verified = apiInstance.verify(
      rawBody,
      Buffer.from(xsignature, "base64"),
      publicKey
    );
    console.log("/webhook/payment EVENT===========>: ", parsed.event_type);
    console.log("/webhook/payment VERIFIED=============>: ", verified);

    // Create order
    createOrder(test, "test@gmail.com");

    // You can add logic to update db qty here

    res.end("WEBHOOK OK!");
  });
}

// const { rawBody, headers } = req;
// const parsed = JSON.parse(rawBody);
// const xsignature = headers["x-signature"];
// const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

// const verified = apiInstance.verify(
//   rawBody,
//   Buffer.from(xsignature, "base64"),
//   publicKey
// );
// console.log("/webhook/payment EVENT===========>: ", parsed.event_type);
// console.log("/webhook/payment VERIFIED=============>: ", verified);
// //create order
// createOrder(test, 'test@gmail.com');

// //update db qty

// res.end("WEBHOOK OK!");
