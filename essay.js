const {bot, openai, keyboard} = require('./index')
const {session, Stage, Markup}= require('telegraf')
const Scene = require ('telegraf/scenes/base')


const essayScene = new Scene('essayscene')
const correctorScene = new Scene('essaycorrector')


essayScene.enter(ctx=>ctx.reply('✍️ Write your essay question to generate'))

essayScene.on('text', async (ctx)=>{
        const essayquestion = ctx.message.text
        if(essayquestion.length>250){
            ctx.reply('Essay mavzusini yuboring')
          }
          else{
        ctx.reply('⏳ Generating essay ...')
        const completion = await openai.completions.create({
          model: "text-davinci-003",
          prompt: `Write an IELTS essay to this topic: ${essayquestion}`,
          max_tokens: 700,
          temperature: 0,
        });
        const essayText = completion.choices[0].text;
        const paragraphs = essayText.split('\n\n'); // Assuming paragraphs are separated by two line breaks
      
        // Format paragraphs with <p> tags
        const formattedEssay = paragraphs.join('\n\n');

        ctx.replyWithHTML(formattedEssay)
        ctx.scene.leave();
    }
      
      })

      //Essay Corrector
      correctorScene.enter(ctx=>ctx.reply('🔍 Tekshirtirmoqchi bo\'lgan essayingizni tashlang.'))

      correctorScene.on('text', async (ctx)=>{
        const propmtEssay = ctx.message.text
        ctx.reply('⏳ Esseyingiz tekshirilmoqda ...')
        const completion = await openai.completions.create({
          model: "text-davinci-003",
          prompt: `Correct this IELTS essay in terms of grammar, spelling and vocabulary and send me errors: ${propmtEssay}`,
          max_tokens: 1000,
          temperature: 0,
        });
        const CorrectedText = completion.choices[0].text;

        ctx.replyWithHTML(CorrectedText)
        ctx.scene.leave();
    
      
      })




// Create a stage and register the scene
const stage = new Stage([essayScene, correctorScene]);
bot.use(session());
bot.use(stage.middleware());

bot.hears('📝 Essay Generator', (ctx) => ctx.scene.enter('essayscene'));
bot.hears('✅ Essay Corrector', (ctx) => ctx.scene.enter('essaycorrector'));



