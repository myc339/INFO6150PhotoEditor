const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controller/UserController");
const ImagebankController=require("./controller/ImagebankController");
const cors = require('cors');
// db instance connection
require("./config/db");

const app = express();
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://localhost:3301'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
        user: '18810922130@163.com', //邮箱的账号
        pass: 'FWHxue130103'//邮箱的密码
        }
    });
let mailOptions = {
        from: '18810922130@163.com', //邮件来源
        to: '', //邮件发送到哪里，多个邮箱使用逗号隔开
        subject: '', // 邮件主题
        //text: 'Hello world ?', // 存文本类型的邮件正文
        html: '<h1>Hello world</h2><p><img src = "cid:0011"></p>', // html类型的邮件正文
        attachments: [
        {
        	filename: 'test.jpg',//附件名称
            path: '',//附件的位置
            cid: '0011' //为附件添加一个引用名称
        }
        ]
    };


//here is the magic
app.use(cors(corsOptions));
const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app
  .route("/users")
  .get(taskController.listAllUsers);
  
  app
  .route("/registration")
  .post(taskController.createNewUser);
app
  .route("/users/:usersId")
  .get(taskController.readUser)
  .put(taskController.updateUser)
  .delete(taskController.deleteUser);
app
  .route("/authentication")
  .get(taskController.authenticate);
  app
.route("/Imagebank")
.get(ImagebankController.listAllImage);
app
.route("/Imagebank/Save")
.post(ImagebankController.AddNewImage);


app.options('/sendmail', function (req, res) {
  res.sendStatus(200);
});
app.post('/sendmail', function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Change this to your Angular 2 port number
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  //mailOptions.to=req.body.to;
  mailOptions.to=req.body.To;
  mailOptions.subject=req.body.title;
  mailOptions.attachments.path=req.body.content;
  console.log(req.body.To);
  
  console.log(req.body.content);

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



