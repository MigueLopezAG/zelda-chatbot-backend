import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { findAnswer, saveMessage } from './chatService';

export const setupWebSocket = (io: Server): void => {
  io.use(async (socket: any, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return next(new Error('User not found'));
      }
      socket.userId = user._id.toString();
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log('User connected:', socket.userId);

    socket.on('sendMessage', async (content: string) => {
      try {
        // Guardar mensaje del usuario
        await saveMessage(socket.userId, content, true);
        socket.emit('chatMessage', {
          id: Date.now().toString(),
          content,
          timestamp: new Date(),
          isUser: true
        });

        // Obtener respuesta del bot
        const answer = findAnswer(content);
        
        // Guardar respuesta del bot
        await saveMessage(socket.userId, answer, false);

        // Enviar respuesta al usuario
        setTimeout(() => {
          socket.emit('chatMessage', {
            id: Date.now().toString(),
            content: answer,
            timestamp: new Date(),
            isUser: false
          });
        }, 1000); // Simular un pequeño retraso en la respuesta
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
    });
  });
};