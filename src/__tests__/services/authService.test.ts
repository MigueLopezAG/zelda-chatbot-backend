import { registerUser, loginUser } from '../../services/authService';
import User from '../../models/User';

describe('Auth Service', () => {
  describe('registerUser', () => {
    it('should register a new user', async () => {
      const user = await registerUser('testuser', 'test@example.com', 'password123');
      
      expect(user).toBeDefined();
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      
      // Verify user if user is saved to database
      const dbUser = await User.findOne({ email: 'test@example.com' });
      expect(dbUser).not.toBeNull();
      expect(dbUser?.username).toBe('testuser');
    });

    it('should throw error for duplicate email', async () => {
      await registerUser('testuser1', 'test@example.com', 'password123');
      
      await expect(
        registerUser('testuser2', 'test@example.com', 'password456')
      ).rejects.toThrow('User already exists');
    });
  });

  describe('loginUser', () => {
    beforeEach(async () => {
      await registerUser('testuser', 'test@example.com', 'password123');
    });

    it('should login with correct credentials', async () => {
      const { user, token } = await loginUser('test@example.com', 'password123');
      
      expect(user).toBeDefined();
      expect(user.email).toBe('test@example.com');
      expect(token).toBeDefined();
    });

    it('should throw error with incorrect password', async () => {
      await expect(
        loginUser('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw error with non-existent email', async () => {
      await expect(
        loginUser('nonexistent@example.com', 'password123')
      ).rejects.toThrow('Invalid email or password');
    });
  });
});