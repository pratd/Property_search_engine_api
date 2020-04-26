const buyersRequestsSchema = require("../models/buyers_requests.js");
var nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  method: "POST",
  path: "/request/send",

  config: {
    payload: {
      output: "stream",
      parse: true,
      allow: [
        "application/json",
        "multipart/form-data",
        "image/jpeg",
        "application/pdf",
        "application/x-www-form-urlencoded",
      ],
      multipart: true,
      maxBytes: 1024 * 1024 * 100,
      timeout: false,
    },
    handler: async (req, res) => {
      const data = req.payload;
      const property_id = data.property_id;
      const seller_id = data.seller_id;
      const seller_name = data.seller_name;
      const seller_email = data.seller_email;
      const buyer_name = data.name;
      const buyer_message = data.message;
      const buyer_email = data.email;
      const request = new buyersRequestsSchema({
        property_id: property_id,
        seller_id: seller_id,
        seller_name: seller_name,
        seller_email: seller_email,
        buyer_name: buyer_name,
        buyer_message: buyer_message,
        buyer_email: buyer_email,
      });
      try {
        await request.save();
        const mail = process.env.MAIL;
        const pwd = process.env.MAILPWD;
        const transport = {
          // service: 'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: mail,
            pass: pwd,
          },
        };
        var transporter = nodemailer.createTransport(transport);
        await transporter.verify((error, success) => {
          if (error) {
            console.log(error);
          } else {
            const mailAttr = {
              from: "info@lookhaus.com",
              to: buyer_email,
              subject:
                "Your property nº " +
                property_id +
                " has received a new request",
              text: buyer_message,
            };
            transporter.sendMail(mailAttr, (err, info) => {
              console.log(info.envelope);
              console.log(info.messageId);
              console.log("Email sent");
            });
          }
        });
        return res.response("Saved to DB and email sent!");
      } catch(err) {
        return res.response(
          "There was an error, saving to DB or sending the email"
        );
      }
    },
  },
};
