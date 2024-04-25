const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'parkingservicesforproject@gmail.com',//your gmail acct
        pass: 'bhxh veex krhu nbqz'//app password thats generated
    }
});


async function sendEmail(toEmail, subject, text){
    try{
        let info = await transporter.sendMail({
            from: 'Billybob Joe',
            to: toEmail,
            subject: subject,
            text: text
        });
        console.log('Email sent: ' + info.response);
        return true;
    } catch(error){
        console.error('Error sending email: ' ,error);
        return false;
    }
}

module.exports = {sendEmail};