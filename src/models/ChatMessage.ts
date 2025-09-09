import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessageSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isUser: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);