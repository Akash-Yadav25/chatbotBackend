import express from 'express';
import {openAIChat, azureOpenAIChat} from '../controllers/chatController.js'

const router = express.Router();

router.post('/open-ai-chatbot', openAIChat);
router.post('/azure-open-ai-chatbot', azureOpenAIChat);

export default router;