const Chip = require("Chip").default;
import {
  createOrder,
  createOrder2,
  fetchOrderInWebhook,
  markOrderAsPaid,
} from "@/libs/apis";

//Chip set up
Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
Chip.ApiClient.instance.token = process.env.API_KEY;
const apiInstance = new Chip.PaymentApi();

// const testProductCreate = [
//   {
//     _id: "847aa179-c68b-4f15-866c-302a1ab1809a",
//     name: "game of thrones",
//     images: [
//       {
//         "_key": "b8dc70d5cbce",
//         "url": "https://images.unsplash.com/photo-1507388644107-ce16cdf15eba?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//       }
//     ],
//     quantity: 1,
//     maxQuantity: 120,
//     price: 121,
//   }
// ];

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
      console.log(" Products ++++===>", parsed.purchase.products);

      // if (parsed.event_type === "purchase.paid") {
      //   if (
      //     parsed.purchase &&
      //     Array.isArray(parsed.purchase.products) &&
      //     parsed.client &&
      //     parsed.client.email
      //   ) {
      //     try {
      //       const data = await createOrder2(
      //         parsed.purchase.products,
      //         parsed.client.email
      //       ); // is asyn func , add await is important else result not consistent

      //       console.log("yay!order Created=====>", data);
      //     } catch (error) {
      //       console.error("Error creating order:", error);
      //     }
      //   } else {
      //     console.log("Missing required data for creating order.");
      //   }
      // }
      if (parsed.event_type === "purchase.paid") {
        const orderData = await fetchOrderInWebhook(parsed.reference);
        console.log("Order fetched in webhook ===>", orderData);
        console.log("orderData[0]._id ===>", orderData[0]._id);

        const updatedToPaid = await markOrderAsPaid(orderData[0]._id);
        console.log("updatedToPaid===>", updatedToPaid);
      }

      //console.log("love to see what inside headers ===>", seeHeaders);
      //console.log("love to see what inside: Buffer.from(xsignature,`base64`) ===>", curiousBuffer);
    } else {
      console.log("X-Signature header is null");
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
