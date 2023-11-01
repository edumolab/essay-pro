const OpenAI = require('openai');
const { Telegraf, Markup }= require('telegraf');
const dotenv = require('dotenv')
const { Keyboard  } = require('telegram-keyboard')
dotenv.config()

const keyboard = Markup.keyboard([
    ['📝 Essay Generator', '✅ Essay Corrector'],
    [ '🌐 Tarjimon']
  ]).oneTime().resize();


const bot = new Telegraf(process.env.bot_api)

const openai = new OpenAI({
  apiKey: process.env.Api_key,
})




bot.start((ctx)=>{
    ctx.replyWithChatAction('typing')
    ctx.re
    setTimeout(()=>{
        ctx.replyWithHTML(`Assalomu alaykum, <b>${ctx.message.chat.first_name}</b>. Men Essay yozib beruvchi va tarjimon botman. Menyulardan birini tanlang: 👇`, {
            reply_markup: keyboard,
          });
    },200)    
})

module.exports= {bot, openai, keyboard}
require('./essay')

bot.launch()