import request from 'supertest';
import app from '../../app';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

describe('Chat Controller', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();
    
    userId = user._id.toString();
    token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
  });

  describe('GET /api/chat/history', () => {
    it('should return chat history for authenticated user', async () => {
      const response = await request(app)
        .get('/api/chat/history')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 for unauthenticated requests', async () => {
      const response = await request(app)
        .get('/api/chat/history');
      
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/chat/send', () => {
    it('should process message and return response', async () => {
      const response = await request(app)
        .post('/api/chat/send')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: '¿Quién es Link?' });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('answer');
      expect(response.body.answer).toContain('protagonista');
    });

    it('should return 401 for unauthenticated requests', async () => {
      const response = await request(app)
        .post('/api/chat/send')
        .send({ message: 'Test message' });
      
      expect(response.status).toBe(401);
    });
  });
});