import express, { response } from 'express'
import { OpenAI, AzureOpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

export const openAIChat = async (req, res, next) => {
    const { message } = req.body;
    const systemPrompt = `You are an assistant that classifies customer messages into structured summaries.
When a customer sends a message, respond only with a JSON object containing four fields:
    Your Ouput Format:
    {
    "summary": "Summarize the customer's issue in one concise sentence.",
    "category": "Classify the message into one of these categories: 'Refund Issue', 'Shipping Delay', 'Account Problem', 'Technical Issue', 'General Inquiry', 'Other'.",
    "urgency": "Rate the urgency based on emotional tone and time sensitivity. Use one of: 'Low', 'Medium', or 'High'.",
    "sentiment": "Identify the tone of the message. Use one of: 'Positive', 'Neutral', or 'Negative'."
    }

Instruction:
1.Be objective and concise.
2.Do not include extra text, comments, or explanations.
3.Your only output should be the properly formatted JSON object.

Example:

Input : 
I've been waiting 3 days for my refund and your support hasn't replied. This is really frustrating.
Expected Output : 
{
  "summary": "Customer is upset due to a delayed refund and lack of support response.",
  "category": "Refund Issue",
  "urgency": "High",
  "sentiment": "Negative"
}
`
    try {
        console.log(message)
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_KEY
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    "role": "user",
                    "content": message
                },
            ],
        });
        //console.dir(completion, { depth: null })
        response = JSON.parse(completion.choices[0].message.content)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
};

export const azureOpenAIChat = async (req, res, next) => {
    const { message } = req.body;
    const systemPrompt = `You are an assistant that classifies customer messages into structured summaries.
When a customer sends a message, respond only with a JSON object containing four fields:
    Your Ouput Format:
    {
    "summary": "Summarize the customer's issue in one concise sentence.",
    "category": "Classify the message into one of these categories: 'Refund Issue', 'Shipping Delay', 'Account Problem', 'Technical Issue', 'General Inquiry', 'Other'.",
    "urgency": "Rate the urgency based on emotional tone and time sensitivity. Use one of: 'Low', 'Medium', or 'High'.",
    "sentiment": "Identify the tone of the message. Use one of: 'Positive', 'Neutral', or 'Negative'."
    }

Instruction:
1.Be objective and concise.
2.Do not include extra text, comments, or explanations.
3.Your only output should be the properly formatted JSON object.

Example:

Input : 
I've been waiting 3 days for my refund and your support hasn't replied. This is really frustrating.
Expected Output : 
{
  "summary": "Customer is upset due to a delayed refund and lack of support response.",
  "category": "Refund Issue",
  "urgency": "High",
  "sentiment": "Negative"
}
`
    try {
        console.log(message)
        const azureClient = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_KEY,
            apiVersion: "xxxx-xx-xx", //version of deployment
        });

        const completion = await azureClient.chat.completions.create({
            deployment: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    "role": "user",
                    "content": message
                },
            ],
        })

        response = JSON.parse(completion.choices[0].message.content)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
};