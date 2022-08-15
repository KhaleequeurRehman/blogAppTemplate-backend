const nodemailer = require('nodemailer')


// here I am sending message to admin this api used to contact us page
const contact = async function (req, res) {

    try {

        const name = req.body.name
        const email = req.body.email
        const phoneNumber = req.body.phoneNumber
        const message = req.body.message

        // here I am sending email to admin, because cleint is sending message from contact us page
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'paywithpal2020@gmail.com', // generated ethereal user
                pass: "cyfdsvfdgyhtpjbq", // generated ethereal password
            },
        });

        var mailOptions = {
            from: 'paywithpal2020@gmail.com',
            to: "rehanpardesi2018@gmail.com",
            subject: 'Contact us',
            html: `
        <p>
            Name : ${name} <br>
            Email  : ${email} <br>
            Phone Number : ${phoneNumber} <br>
            Message : ${message}
        </p>
        
        `
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(424).json({ error })
            } else {
                res.status(200).json({ "msg": "message sent successfully" })
            }
        });

    } catch (err) {
        res.status(500).json({err})
    }

}



// here I am exports the moduel 
module.exports = contact