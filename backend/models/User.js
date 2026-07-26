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
  // Program fields
  primaryDiscipline: {
    type: String,
    default: 'CSE'
  },
  programType: {
    type: String,
    enum: ['BTech', 'DualMajor', 'DualDegree', 'MScDual'],
    default: 'BTech'
  },
  secondaryDiscipline: {
    type: String,
    default: ''
  },
  // Academic fields
  admissionYear: {
    type: Number,
    required: true,
    default: 2026
  },
  currentSemester: {
    type: Number,
    default: 1
  },
  // Honors and Minor
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
  // Profile
  profilePicture: {
    type: String,
    default: ''
  },
  // Program requirements (cached)
  programRequirements: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  // Auth
  refreshTokens: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual field for program name
userSchema.virtual('programName').get(function() {
  const discipline = this.primaryDiscipline || 'CSE';
  const type = this.programType || 'BTech';
  if (type === 'BTech') return `B.Tech ${discipline}`;
  if (type === 'DualMajor') return `B.Tech with Dual Major (${this.secondaryDiscipline || 'TBD'})`;
  if (type === 'DualDegree') return `B.Tech-M.Tech Dual Degree (${this.secondaryDiscipline || 'TBD'})`;
  if (type === 'MScDual') return `B.Tech-M.Sc Dual Degree (${this.secondaryDiscipline || 'TBD'})`;
  return `B.Tech ${discipline}`;
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update program and regenerate requirements
userSchema.methods.updateProgram = async function(primaryDiscipline, programType, secondaryDiscipline = null) {
  this.primaryDiscipline = primaryDiscipline;
  this.programType = programType;
  this.secondaryDiscipline = secondaryDiscipline || '';
  
  const { generateProgramRequirements } = await import('../data/programRequirements.js');
  this.programRequirements = generateProgramRequirements(
    primaryDiscipline,
    programType,
    secondaryDiscipline
  );
  
  return this.save();
};

export default mongoose.model('User', userSchema);