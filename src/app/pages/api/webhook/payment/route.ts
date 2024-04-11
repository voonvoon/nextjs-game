// File: `pages/api/webhooks/someProvider.ts`

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Readable } from 'node:stream';

// EXPORT config to tell Next.js NOT to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};

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