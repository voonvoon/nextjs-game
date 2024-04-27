// const nodemailer = require("nodemailer");
// const Mailgen = require("mailgen");

// // import nodemailer from "nodemailer";
// // import Mailgen from "mailgen";


// const emailSubPaid = async (emailToSend: string) => {
//   let transporter = nodemailer.createTransport({
//     service: "Gmail",
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   try {
//     let mailGenerator = new Mailgen({
//       theme:"salted",
//       product: {
//         name:"Next Game Commerce",
//         //link: process.env.EMAIL_MAIN_URL,
//         link:"www.google.com",
//         logo: "https://res.cloudinary.com/dbgj9uwjp/image/upload/v1700372458/beanCollectorLogo_3_zwztfr.png",
//         logoHeight: "200px",
//       },
//     });

//     // end of action btn

//     const email = {
//       body: {
//         name: "Mr Successss",
//         intro: `Your subscription (ID: "XXX") is paid! Visit our website, log in, and check 'Dashboard' -> 'My Subscription' for details.`,
//         outro: [
//           "Need help, or have questions? just reply to this email, we'd love to help you up.",
//         ],
//         action: {
//           instructions: "",
//           button: {
//             color: "green",
//             text: "Visit Website",
//             //link: process.env.EMAIL_MAIN_URL,
//             link: "www.google.com"
//           },
//         },
//       },
//     };

//     let emailBody = mailGenerator.generate(email);
//     let message = {
//       from: process.env.EMAIL,
//       to: emailToSend,
//       subject: `Subscription ID: "XXX" payment successful!-- Game Commerce site.`,
//       html: emailBody,
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     //throw error;
//     console.error("Error in sending email:", error);
//     return error;
//   }
// }

// // module.exports = {
// //   emailSubPaid,
// // };
// export { emailSubPaid };




//export default emailSubPaid;

// const nodemailer = require("nodemailer");

// const emailSubPaid = async (emailToSend: string) => {
//   let transporter = nodemailer.createTransport({
//     service: "Gmail",
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   try {
//     const email = {
//       from: process.env.EMAIL,
//       to: emailToSend,
//       subject: `Subscription ID: "XXX" payment successful!-- Game Commerce site.`,
//       text: "This is a testing email.",
//     };

//     await transporter.sendMail(email);
//     return true;
//   } catch (error) {
//     console.error("Error in sending email:", error);
//     return error;
//   }
// }

// export { emailSubPaid };



//without package:
const nodemailer = require("nodemailer");

const emailSubPaid = async (emailToSend: string) => {
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
      subject: `Subscription ID: "XXX" payment successful!-- Game Commerce site.`,
      html: `
        <html>
          <head>
            <title>I Hate NPM sometime!</title>
            <style>
              .button {
                background-color: #4CAF50;
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
              }
            </style>
          </head>
          <body>
            <h1>I Love NPM sometime!!</h1>
            <p>I Love NPM sometime!!I Love NPM sometime!!I Love NPM sometime!!I Love NPM sometime!!</p>
            <p>Thank you for choosing our service!</p>
            <a href="www.google.com" class="button">View Account</a>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.error("Error in sending email:", error);
    return error;
  }
}

export { emailSubPaid };






// const nodemailer = require("nodemailer");
// const { compile } = require("mjml");

// const emailSubPaid = async (emailToSend: string) => {
//   let transporter = nodemailer.createTransport({
//     service: "Gmail",
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   try {
//     // Compile your MJML template
//     const mjmlTemplate = `
//       <mjml>
//         <mj-body>
//           <mj-section>
//             <mj-column>
//               <mj-text>
//                 Hello Mr Successss,
//               </mj-text>
//               <mj-text>
//                 Your subscription (ID: "XXX") is paid! Visit our website, log in, and check 'Dashboard' -> 'My Subscription' for details.
//               </mj-text>
//               <mj-button href="www.google.com" background-color="green">
//                 Visit Website
//               </mj-button>
//               <mj-text>
//                 Need help, or have questions? Just reply to this email, we'd love to help you up.
//               </mj-text>
//             </mj-column>
//           </mj-section>
//         </mj-body>
//       </mjml>
//     `;

//     const { html } = compile(mjmlTemplate);

//     const message = {
//       from: process.env.EMAIL,
//       to: emailToSend,
//       subject: `Subscription ID: "XXX" payment successful! -- Game Commerce site.`,
//       html: html,
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error("Error in sending email:", error);
//     return error;
//   }
// };

// export {
//   emailSubPaid,
// };
