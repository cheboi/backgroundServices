const express =require('express')
const app= express()
const {welcomeEmailService} = require('./Services/welcomeUser')
var cron = require('node-cron');

const run =()=>{
cron.schedule('*/5 * * * * *', async () => {
  await welcomeEmailService()
});
}

run()


app.listen(6000)