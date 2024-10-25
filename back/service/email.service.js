var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dsi.meah@gmail.com',
    pass: 'teatfwxtnxinavvq'
  }
});

var mailOptions = {
  from: 'dsi.meah@gmail.com',
  to: '',
  subject: '',
  html: ''
};
async function estEmail(val) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(val) === false){
        let err = new Error("Email incorrecte");
        err.name = "email";
        throw err;
    }
  }
exports.estEmail = estEmail;
async function sendEmail(toemail,subject,html,setValid){
    mailOptions.to = toemail;
    mailOptions.subject = subject,
    mailOptions.html = html;
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            setValid(false);
        } else {
            setValid(true);
        }
      });
}
exports.sendEmail = sendEmail;