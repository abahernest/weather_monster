const nodemailer = require("nodemailer");
require('dotenv').config();
let title = process.env.PROJECT_TITLE;
let fromAddress = process.env.SMTP_FROM;


const sendMail = {

    async emailer(receiver, subject, message) {
        try {
            // send mail with defined transport object
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USERNAME, 
                    pass: process.env.SMTP_PASSWORD, 
                },
            });

            let info = await transporter.sendMail({
                from: '"' + title +'" <'+ fromAddress +'>', // sender address
                to: receiver, // list of receivers
                subject: subject, // Subject line
                html: message, // plain text body
            });

        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = sendMail;