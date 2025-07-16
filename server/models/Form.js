import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'mcq'], required: true },
  question: { type: String, required: true },
  options: [String]
});

const formSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  title: { type: String, required: true },
  questions: [questionSchema],
  publicId: { type: String, default: () => nanoid(10), unique: true },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
export default Form;
