require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sendEmails = (res, recipients, subject, email) => {
  console.log("button clicked");
  //   let msg = {
  //     to: "claire@glenrockhay.com",
  //     bcc: recipients || [
  //       {
  //         email: "amy@aimhigherweb.design"
  //       }
  //     ],
  //     from: {
  //       name: "Claire | Glenrock Hay",
  //       email: "claire@glenrockhay.com"
  //     },
  //     subject: subject || "Fallbacl",
  //     text: email || "Test Email Fallback"
  //   };

  //   console.log(msg);

  //   sgMail.send(msg);

  //   res.write("Emails Sent");
};
