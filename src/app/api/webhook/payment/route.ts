import sanityClient from "@/libs/sanity";
import { NextResponse } from "next/server";
import { createOrder, updateGameQuantity } from "@/libs/apis";
const Chip = require("Chip").default;


//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

export async function POST(req: any, res: any) {
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
  //create order 


  //update db qty


  res.end("WEBHOOK OK!");
}
