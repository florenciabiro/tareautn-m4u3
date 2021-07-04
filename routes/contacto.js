var express = require('express');
const { getMaxListeners } = require('process');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    isContacto:true
  });
});

router.post('/', async(req, res, next) => {

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  /* array de elementos concateno los 4 */
  var obj = {
    to: 'biroutn@gmail.com', 
    subject :'CONTACTO desde la  WEB',
    html: nombre +  "se ha contactado por medio del formulario web y quere mas informacion a este correo :" + email + ". <br> Ademas, hizo este comentario :" + mensaje + " .<br> su telefono es : " + tel 
  }



  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }

  }); 


var info = await transport.sendMail(obj);

res.render('contacto',{
  message:'Mensaje enviado correectamente '
  });


 });
 
 module.exports = router;