import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, passwordHash });
    await newAdmin.save();

    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: 'Not found' });

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
