import Form from '../models/Form.js'
import Response from '../models/Response.js';

export const createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newForm = new Form({
      adminId: req.adminId,
      title,
      questions
    });

    await newForm.save();

    res.status(201).json({ msg: 'Form created', publicId: newForm.publicId });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getFormByPublicId = async (req, res) => {
  try {
    const form = await Form.findOne({ publicId: req.params.publicId });
    if (!form) return res.status(404).json({ msg: 'Form not found' });

    res.status(200).json({
      title: form.title,
      questions: form.questions
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const submitResponse = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { answers } = req.body;

    const form = await Form.findOne({ publicId });
    if (!form) return res.status(404).json({ msg: 'Form not found' });

    if (answers.length !== form.questions.length) {
      return res.status(400).json({ msg: 'Invalid number of answers' });
    }

    const response = new Response({
      formId: form._id,
      answers
    });

    await response.save();
    res.status(201).json({ msg: 'Response submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getFormResponses = async (req, res) => {
  try {
    const formId = req.params.formId;

    // Check if the form belongs to this admin
    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ msg: 'Form not found' });
    if (form.adminId.toString() !== req.adminId) {
      return res.status(403).json({ msg: 'Unauthorized access' });
    }

    // Get all responses
    const responses = await Response.find({ formId });

    res.status(200).json({
      totalResponses: responses.length,
      responses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllFormsForAdmin = async (req, res) => {
  try {
    const forms = await Form.find({ adminId: req.adminId }).sort({ createdAt: -1 });

    res.status(200).json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};