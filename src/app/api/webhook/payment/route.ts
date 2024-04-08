import sanityClient from "@/libs/sanity";
import { NextResponse } from "next/server";
import { createOrder, updateGameQuantity } from "@/libs/apis";
const Chip = require("Chip").default;

// Chip set up
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

// Define middleware function
function rawBodyMiddleware(req:any, res:any, next:any) {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk:any) {
    if (chunk) req.rawBody += chunk;
  });

  req.on("end", function () {
    next();
  });
}

export async function POST(req:any, res:any) {
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
  createOrder(test, 'test@gmail.com');

  //update db qty

  res.end("WEBHOOK OK!");
}

// Implement middleware in the route
export default function handler(req:any, res:any) {
  rawBodyMiddleware(req, res, function () {
    POST(req, res);
  });
}









// testing start above==================

// import sanityClient from "@/libs/sanity";
// import { NextResponse } from "next/server";
// import { createOrder, updateGameQuantity } from "@/libs/apis";
// const Chip = require("Chip").default;

// //Chip set up
// Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
// Chip.ApiClient.instance.token = process.env.API_KEY;
// const apiInstance = new Chip.PaymentApi();

// const test = [{
//   _id: "testid",
//   name: "testName",
//   images: [],
//   quantity: 121, 
//   maxQuantity: 121,
//   price: 121,
// }];

// export async function POST(req: any, res: any) {
//   const { rawBody, headers } = req;
//   const parsed = JSON.parse(rawBody);
//   const xsignature = headers["x-signature"];
//   const publicKey = process.env.WEBHOOK_PUBLIC_KEY;

//   const verified = apiInstance.verify(
//     rawBody,
//     Buffer.from(xsignature, "base64"),
//     publicKey
//   );
//   console.log("/webhook/payment EVENT===========>: ", parsed.event_type);
//   console.log("/webhook/payment VERIFIED=============>: ", verified);
//   //create order
//   createOrder(test, 'test@gmail.com');

//   //update db qty

//   res.end("WEBHOOK OK!");
// }
