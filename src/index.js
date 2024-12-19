import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();


const app=express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('Hello World');
});

app.post('/create-custom-email',async (req,res)=>{
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    openAIApiKey: process.env.OPEN_API_KEY,
  });

  const playerName = req.body.playerName;
  const gpa = req.body.gpa;
  const position = req.body.position; 
  let messages = [];

  const emailPrompt = `
    Write an catchy email to the coach of a college team in max 150 words also formatted well. The player's name is ${playerName}, 
    their GPA is ${gpa}, and they play as a ${position}. 
    The email should express interest in joining the team and highlight the player's achievements. Dont add extra information at all.
  `;

  const emailMessage = new HumanMessage(emailPrompt);
  messages.push(emailMessage);

  const response = await model.invoke(messages);
  console.log(messages);
  console.log(response, "response");
  res.send({
    content: response.content,
  });
})

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})



