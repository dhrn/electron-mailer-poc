import * as nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";


class MailTransporter {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  setup(config = {}): void {
    const _config = Object.assign({}, config);
    console.log("Setting up transporter", JSON.stringify(config, null , 4));
    this.transporter = nodemailer.createTransport(_config);
  }

  send({ from, to, subject, body }): Promise<any> {
     console.log("Sending EMail ", JSON.stringify({ from, to, subject, body }, null , 4));
     return new Promise(async (resolve, reject): Promise<void> => {
      try {
        const info = await this.transporter.sendMail({
          from: from, // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          text: body, // plain text body
          html: `<b>${body}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..
        resolve(nodemailer.getTestMessageUrl(info) );
       } catch(e) {
         reject(e)
       }
     })
    }

}

export const mailTransporter = new MailTransporter();
