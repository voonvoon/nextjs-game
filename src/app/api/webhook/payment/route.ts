import { NextResponse } from "next/server";
//import { createOrder, updateGameQuantity } from "@/libs/apis";
const Chip = require("Chip").default;

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

const test = [{
  _id: "testid",
  name: "testName",
  images: [],
  quantity: 121,
  maxQuantity: 121,
  price: 121,
}];

export async function POST(req:any, res: any) {
  try {
    const { headers } = req;
    
    // Read the request body stream and parse it as JSON
    let rawBody = '';
    req.on('data',  (chunk: Buffer) => {
      rawBody += chunk;
    });
    req.on('end', () => {
      try {
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
        //createOrder(test, 'test@gmail.com');

        // Update db qty

        res.end("WEBHOOK OK Voon!");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(400).end("Bad Request");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).end("Internal Server Error");
  }
}
