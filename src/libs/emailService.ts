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

  //console.log("Items======>", items);

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
            background-color: transparent;
            border: 2px solid #3F51B5;
            color: #3F51B5; /* Blue text color */
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 10px;
            transition: background-color 0.3s, color 0.3s, border-color 0.3s;
        }
        
        /* Hover effect */
        .button:hover {
            background-color: #3F51B5; 
            color: white; 
        }
        
        /* Click effect */
        .button:active {
            background-color: #7986CB; 
            border-color: #7986CB; 
            color: white;
        }
        
        .footer {
            margin-top: 20px;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .footer p {
            margin-bottom: 10px;
        }
        .footer a {
            color: #3F51B5;
            text-decoration: none;
        }
        
        
        </style>
      </head>
      <body>
        <h1>Thank you for your purchase!🥳</h1>
        <p>Purchase Details:</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
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
        <td>${item.game.name.toUpperCase()}</td>
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
        <a href="https://nextjs-game-beta.vercel.app" class="button">Visit Store</a>
<hr/>
        <div class="footer">
        <img src="https://res.cloudinary.com/dbgj9uwjp/image/upload/v1700372458/beanCollectorLogo_3_zwztfr.png" alt="Company Logo" style="max-width: 100px;">
        <p>Address: Menara Success A-1612, Jln simfoni3 , Kuala Lumpur, Malaysia</p>
        <p>Phone: 016-8899552</p>
        <p>Email: gamenextjs@vercel.com</p>
        <p>Website: <a href="https://nextjs-game-beta.vercel.app">Game Nextjs Store</a></p>
        <p> Game Nextjs Store <span>&copy;</span> All rights reserved.</p>
    </div>
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
