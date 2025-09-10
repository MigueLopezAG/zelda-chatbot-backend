import ChatMessage from '../models/ChatMessage';
import { knowledgeBase } from '../utils/KnowledgeBase';

export const findAnswer = (question: string): string => {
  question = question.toLowerCase();
  
  for (const key in knowledgeBase) {
    for (const pattern of knowledgeBase[key].patterns) {
      if (question.includes(pattern)) {
        return knowledgeBase[key].response;
      }
    }
  }
  
  return "Lo siento, no tengo información sobre eso. Puedo ayudarte con información sobre la historia, personajes principales o consejos para avanzar en el juego. ¿Puedes reformular tu pregunta?";
};

export const saveMessage = async (userId: string, content: string, isUser: boolean): Promise<void> => {
  const message = new ChatMessage({ user: userId, content, isUser });
  await message.save();
};

export const getChatHistory = async (userId: string, limit: number = 50): Promise<any[]> => {
  return await ChatMessage.find({ user: userId }).sort({ timestamp: 1 }).limit(limit).populate('user', 'username');
};