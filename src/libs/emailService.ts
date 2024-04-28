const nodemailer = require("nodemailer");

interface orderDataTs {
  _id: string;
  items: [{ quantity: number; game: { name: string; price: number } }];
}

interface PurchaseItem {
  game: { name: string; price: number };
  quantity: number;
}

const emailSubPaid = async (emailToSend: string, orderData: orderDataTs) => {
  const { _id, items } = orderData;

  console.log("Items======>", items);

  function calculateTotal(items: PurchaseItem[]) {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.game.price;
    });
    return total;
  }

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const email = {
      from: process.env.EMAIL,
      to: emailToSend,
      subject: `Purchase successful! purchase ID: ${_id}-- Game Commerce site.`,
      html: `
      <html>
      <head> 
        <title>Thank you for your purchase!🥳</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: #808080;
            font-size: 24px;
          }
          p {
            font-size: 18px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          .button {
            background-color: #2196F3;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 10px;
            transition: background-color 0.3s; 
        }
        
        .button:hover {
            background-color: #45a049; 
        }
        
        .button:active {
            background-color: #3e8e41;
        }
        
        </style>
      </head>
      <body>
        <h1>Thank you for your purchase!🥳</h1>
        <p>Purchase Details:</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price(Per unit)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
  <!-- Loop through purchase array to populate table -->
  <!-- Replace this section with actual data -->
  ${items
    .map((item) => {
      return `
      <tr>
        <td>${(item.game.name).toUpperCase}</td>
        <td>${item.quantity}</td>
        <td>RM${item.game.price}</td> 
        <td>RM${item.quantity * item.game.price}</td>
      </tr>`;
    })
    .join("")}
  <!-- End of data loop -->
</tbody>

        </table>
        <p>Total: RM${calculateTotal(items).toString()}</p>
        <p>Thank you for choosing our service!</p>
        <a href="www.google.com" class="button">Visit Store</a>
      </body>
    </html>`,
    };

    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.error("Error in sending email:", error);
    return error;
  }
};

export { emailSubPaid };
