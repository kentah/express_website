var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send',function(req,res,next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'examplew@gmail.com',  // main email address
      pass: 'password'             // valid password for email address
    }
  });
  var mailOptions = {
      from: 'John Doe <jd@outlook.com>',
      to: 'example@gmail.com',     // must be the same email address as under transporter.auth.user
      subject: 'Website Submission',
      text: 'You have a new submission with the following details...Name: '
          +req.body.name+ ' Email: ' +req.body.email+ 'Message' + req.body.message,
      html: '<p>You got a new submission with the following details:</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  };
  transporter.sendMail(mailOptions, function(error,info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: '+info.response);
      res.redirect('/');
    }
  });
})

module.exports = router;