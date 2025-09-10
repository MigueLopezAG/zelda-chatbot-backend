import User, { IUser } from '../../models/User';

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password);
    expect(savedUser.createdAt).toBeInstanceOf(Date);
  });

  it('should not save user with duplicate email', async () => {
    const userData = {
      username: 'testuser1',
      email: 'test@example.com',
      password: 'password123',
    };

    await new User(userData).save();

    const duplicateUser = new User({
      username: 'testuser2',
      email: 'test@example.com',
      password: 'password456',
    });

    await expect(duplicateUser.save()).rejects.toThrow();
  });

  it('should compare password correctly', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const user = new User(userData);
    await user.save();

    const isMatch = await user.comparePassword('password123');
    const isNotMatch = await user.comparePassword('wrongpassword');

    expect(isMatch).toBe(true);
    expect(isNotMatch).toBe(false);
  });
});