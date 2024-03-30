import { MongoClient } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}

let client;
let clientPromise: any;

// if (process.env.NODE_ENV === "development") {

// } else {

// }

if(!process.env.MONGODB_URI) {
    throw new Error('Invalide/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGODB_URI

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }
  

export default clientPromise;