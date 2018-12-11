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
        to: 'feng.wenh@husky.neu.edu', //邮件发送到哪里，多个邮箱使用逗号隔开
        subject: 'Hello', // 邮件主题
        //text: 'Hello world ?', // 存文本类型的邮件正文
        html: '<h1>Hello world</h2><p><img src = "cid:0011"></p>', // html类型的邮件正文
        attachments: [
        {
        	filename: 'dva.jpg',//附件名称
            path: '/Users/wenhaofeng/Desktop/dva.jpg',//附件的位置
            cid: '0011' //为附件添加一个引用名称
        }
        ]
    };
transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
