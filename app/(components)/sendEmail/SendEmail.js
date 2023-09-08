const sgMail = require('@sendgrid/mail');
// const key="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"
// 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


const sendEmail = async (to, subject, text) =>{
    try {
        await sgMail.setApiKey('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');
          const email = {
            to: to,
            from: 'passbooklets@gmail.com',
            subject: subject,
            text: text
          };
         await sgMail.send(email)
         .then(() => {
           console.log('Email sent successfully!');
         })
         .catch((error) => {
          console.error('Error sending email:', error);
          console.error('SendGrid response:', error.response.body);
        });
        } catch (error) {
            console.log("error", error.message);
        }
    
}

module.exports = {sendEmail};