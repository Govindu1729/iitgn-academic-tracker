// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  program: {
    type: String,
    enum: ['BTech_CSE', 'BTech_AI', 'BTech_EE', 'BTech_ME', 'BTech_ChemE', 'BTech_Civil', 'BTech_MSE', 'BTech_ICDT', 'BTech_MTech_Dual', 'BTech_MSc_Dual'],
    default: 'BTech_CSE'
  },
  admissionYear: {
    type: Number,
    required: true,
    default: 2026
  },
  pursuingHonours: {
    type: Boolean,
    default: false
  },
  pursuingMinor: {
    type: Boolean,
    default: false
  },
  minorDiscipline: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
