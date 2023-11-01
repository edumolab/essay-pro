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


// Middleware to check if the user is a member of the specified channel
bot.use(async (ctx, next) => {
  try {
    const channel = '@multilevel_speakApp';
    const chatMember = await ctx.telegram.getChatMember(channel, ctx.from.id);
    const isSubscribed = ['administrator', 'member', 'owner', 'creator'].includes(chatMember.status);

    if (isSubscribed) {
      return next(); // Continue to the next middleware
    } else {
      ctx.reply("Botdan foydalanish uchun kanalimizga obuna bo'ling", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Kanalga obuna bo'lish", url: "https://t.me/multilevel_speakApp" }]
          ]
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});



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
