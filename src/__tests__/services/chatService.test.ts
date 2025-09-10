import { findAnswer, saveMessage, getChatHistory } from '../../services/chatService';
import ChatMessage from '../../models/ChatMessage';
import User from '../../models/User';

describe('Chat Service', () => {
  let testUser: any;

  beforeEach(async () => {
    testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    await testUser.save();
  });

  describe('findAnswer', () => {
    it('should return correct answer for known questions', () => {
      expect(findAnswer('¿Quién es Link?')).toContain('protagonista');
      expect(findAnswer('Háblame de Zelda')).toContain('princesa');
      expect(findAnswer('Cuéntame sobre Ganon')).toContain('antagonista');
    });

    it('should return default answer for unknown questions', () => {
      const response = findAnswer('¿Quien es Mario Bros?');
      expect(response).toContain('no tengo información');
    });
  });

  describe('saveMessage', () => {
    it('should save a message to database', async () => {
      await saveMessage(testUser._id.toString(), 'Test message', true);
      
      const messages = await ChatMessage.find({ user: testUser._id });
      expect(messages).toHaveLength(1);
      expect(messages[0].content).toBe('Test message');
      expect(messages[0].isUser).toBe(true);
    });
  });

  describe('getChatHistory', () => {
    it('should return chat history for a user', async () => {
      await saveMessage(testUser._id.toString(), '¿Quién es Link?', true);
      await saveMessage(testUser._id.toString(), 'protagonista', false);
      await saveMessage(testUser._id.toString(), 'Háblame de Zelda', true);
      
      const history = await getChatHistory(testUser._id.toString());
      expect(history).toHaveLength(3);
      expect(history[0].content).toBe('¿Quién es Link?');
      expect(history[1].content).toBe('protagonista');
    });
  });
});