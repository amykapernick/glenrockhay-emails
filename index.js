require("dotenv").config();

const express = require("express"),
  app = express(),
  sgMail = require("@sendgrid/mail"),
  bodyParser = require("body-parser"),
  csv = require("csvtojson"),
  Convert = require("ansi-to-html");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static("resources"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "./" });
});

app.post("/email", async (req, res) => {
  const body = req.body,
    subject = body.subject,
    message = body.body;

  //   console.log(req.body);

  let email = `${message}
  		<p>Craig and Claire Kapernick<br>
			32 Nielsons Rd<br>
			CLOYNA Q 4605
		</p>
		<p>Ph: <a href="tel:+61741686136" target="_blank">(07) 41686136</a><br>
			<a href="mailto:admin@glenrockhay.com" target="_blank">admin@glenrockhay.com</a><br>
		</p>
  		<p><img src="http://www.glenrockhay.com/uploads/4/1/0/4/41046915/1414469780.png"></p>`;

  let recipients = await csv({
    noheader: true,
    delimiter: ",",
    headers: ["name", "email"]
  })
    .fromString(body.recipients)
    .then(jsonObj => {
      return jsonObj;
    });

  if (recipients) {
    sendEmails(res, recipients, subject, email);
  }

  res.end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});

const sendEmails = (res, recipients, subject, email) => {
  let msg = {
    to: "claire@glenrockhay.com",
    bcc: recipients,
    from: {
      name: "Claire | Glenrock Hay",
      email: "claire@glenrockhay.com"
    },
    subject: subject,
    html: email
  };

  console.log(msg);

  sgMail.send(msg);

  res.redirect("/?success");

  //   res.write("Emails Sent");
};
