import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: [String], // Each index = answer to a question
  submittedAt: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);
export default Response;
