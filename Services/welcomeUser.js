const ejs= require('ejs')
const {exec} =require( '../DatabaseHelpers/dbhelper.js')
const {sendEmail} = require('../Helper/email')
const welcomeEmailService=async()=>{
    const users =await ( await exec('getUsersToSentEmail')).recordset
    
    for(let user of users){
        ejs.renderFile('templates/welcome.ejs', {name:user.user_name}, async(error,data)=>{
            const messageOptions={
            from:'marakwet.dev.test@gmail.com',
            to: user.email, 
            subject: 'Welcome to our sales on product ',
            html:data
        }

        try {
           await sendEmail(messageOptions)
           await exec('updateSent', {id:user.id}) 
            console.log('Email sent');
        } catch (error) {
            console.log(error);
        }


        })
    }
}


module.exports={welcomeEmailService}