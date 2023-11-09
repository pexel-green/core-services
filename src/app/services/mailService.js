// Create a Nodemailer transporter
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const getHTMLTemplate = (uri) => {
    return `
    <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    text-align: center;
                    background-color: #f2f2f2;
                }

                .container {
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #05a081;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                a{
                    text-decoration: none;
                    color: #fff !important;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <button class="button"><a href=${uri}>Activate Account </a></button>
            </div>
        </body>
        </html>
    `;
}

const getURI = (token) => {
    return process.env.FE + `/activate?token=${token}`
}
const sendMail = (receiver, token) => {
    try {
        const uri = getURI(token)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiver,
            subject: 'Activate Account Pexel',
            html: getHTMLTemplate(uri)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = sendMail;