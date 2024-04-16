import sanityClient from "@/libs/sanity";
import { Game, GameSubset } from "@/model/game";
import { NextResponse } from "next/server";
//import { createOrder, updateGameQuantity } from "@/libs/apis";
const Chip = require("Chip").default;

export async function POST(req: Request, res: Response) {
  const { cartItems, userEmail } = await req.json();
  //const origin = req.headers.get("origin"); //origin:https://example.com

  //Chip set up
  Chip.ApiClient.instance.basePath = process.env.ENDPOINT;
  Chip.ApiClient.instance.token = process.env.API_KEY;
  const apiInstance = new Chip.PaymentApi();

  //console.log("cartItems123====>", cartItems);

  // get item from our own database(sanity)
  const updatedItems: GameSubset[] =
    (await fetchAndCalculateItemPricesAndQuantity(cartItems)) as GameSubset[];

  console.log("updatedItems=====>", updatedItems);

  //make [{product},{product}..]to match chip payment gateway from updatedItems
  const productsForChipIn = updatedItems.map((item) => {
    return {
      _id: item._id,
      name: item.name,
      images: item.images,
      quantity: item.quantity,
      maxQuantity: item.quantity,
      price: item.price * 100,
    };
  });

  //console.log("see formatted products for chip====>", productsForChipIn);

  const client = { email: userEmail || "test@gmail.com" };
  const details = {
    // products: [
    //   { name: "Test", price: 100, quantity: 3, discount: 50 },
    //   { name: "Test2", price: 100, quantity: 3 },
    //   { name: "Test3", price: 300, quantity: 3 },
    // ],
    products: productsForChipIn,
  };

  const purchase = {
    brand_id: process.env.BRAND_ID,
    order_id: "testing123fororder_id",
    client: client,
    purchase: details,
    success_redirect: `${process.env.BASE_URL}/redirect/payment_success`,
    failure_redirect: `${process.env.BASE_URL}/redirect/payment_fialed`,
    success_callback: `${process.env.BASE_URL}/api/callback`,
  };

  try {
    //When the Promise resolves, its value (in this case, the data returned from the API call) is assigned to chipData.
    const chipData = await new Promise((resolve, reject) => {
      //@ts-ignore
      apiInstance.purchasesCreate(purchase, function (error, data, response) {
        if (error) {
          console.log("API call failed. Error:", error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

    //console.log("chipData====>", chipData);

    //res chipData to frtend to redirect to checkout_url
    return NextResponse.json(chipData, {
      status: 200,
      statusText: "payment very successful!",
    });
  } catch (error: any) {
    console.log("Error", error);
    return new NextResponse(error, { status: 500 });
  }
}

// check the quantity against what we've from sanity
//use our own price from sanity

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

    //else we are good to go, continue...:
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
