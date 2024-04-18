import sanityClient from "@/libs/sanity";
import { Game, GameSubset } from "@/model/game";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder, updateGameQuantity } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const {cartItems, userEmail} = (await req.json());
  const origin = req.headers.get("origin"); //origin:https://example.com

  const updatedItems: GameSubset[] =
    (await fetchAndCalculateItemPricesAndQuantity(cartItems)) as GameSubset[];

  console.log("updatedItems=====>", updatedItems);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: updatedItems.map((item) => ({
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          maximum: item.maxQuantity,
          minimum: 1,
        },
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.images[0].url],
          },
          unit_amount: parseInt((item.price * 100).toString()),
        },
      })),
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      phone_number_collection: { enabled: true },
    });

    //update qty in sanity
    //await updateGameQuantity(updatedItems);

    //Create an order in sanity

    await createOrder(updatedItems, userEmail);

    return NextResponse.json(session, {
      status: 200,
      statusText: "payment very successful!",
    });
  } catch (error: any) {
    console.log("Error", error);
    return new NextResponse(error, { status: 500 });
  }
}

// check the quantity against what we've from sanity
//use out own price from sanity

async function fetchAndCalculateItemPricesAndQuantity(cartItems: Game[]) {
  // use async / await
  const query = `*[_type == "game" && _id in $itemIds] {
        _id,
        name,
        price,
        quantity,
        images,
    }`;

  try {
    //fetch items from sanity based on game id
    const itemIds = cartItems.map((item) => item._id); //['id','id',...]
    const sanityItems: GameSubset[] = await sanityClient.fetch({
      query,
      params: { itemIds },
    });

    const updatedItems: GameSubset[] = sanityItems.map((item) => ({
      ...item,
      maxQuantity: item.quantity,
    }));

    // check quantity
    if (checkQuantitiesAgainstSanity(cartItems, updatedItems)) {
      // if true means sanity item qty less than item qty user wants.
      return new NextResponse(
        "Quantity has been updated, please update your cart.",
        { status: 500 }
      );
    }

    //else we are good to go:
    //calculate price
    const calculatedItemPrices: GameSubset[] = updatedItems.map((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem._id === item._id); // this retunrn [] for item match between user sent and sanity db
      return {
        _id: item._id,
        name: item.name,
        images: item.images,
        quantity: cartItem?.quantity as number, //cuz there is posible no cartItem
        maxQuantity: item.quantity,
        price: item.price,
      };
    });

    return calculatedItemPrices;
  } catch (error) {
    return new NextResponse(
      "Quantity has been updated, please update your cart.",
      { status: 500 }
    );
  }
}

function checkQuantitiesAgainstSanity(
  cartItems: Game[],
  sanityItems: GameSubset[]
) {
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const sanityItem = sanityItems[i];

    if (cartItem.quantity <= sanityItem.quantity) {
      return false; // means good to go
    }
  }

  return true; // means bad to go
}
