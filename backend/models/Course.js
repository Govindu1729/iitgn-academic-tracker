// backend/models/Course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 0.5,
    max: 6
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'F', 'P', 'NP', '', 'IP'],
    default: ''
  },
  semester: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  basketType: {
    type: String,
    required: true,
    enum: ['Institute Core', 'HSS', 'Science Basket', 'Mathematics Basket', 'Materials Basket', 'General Education', 'Discipline Core', 'Discipline Elective', 'Open Elective', 'Project', 'External Exposure', 'Honours', 'Minor', 'Other']
  },
  department: {
    type: String,
    enum: ['CSE', 'AI', 'EE', 'ME', 'CE', 'CL', 'MSE', 'ICDT', 'Physics', 'Chemistry', 'Maths', 'Cognitive Science', 'Biology', 'Earth Sciences', 'HSS', 'Institute', 'Other'],
    default: 'Institute'
  },
  isPlanned: {
    type: Boolean,
    default: false
  },
  isPassFail: {
    type: Boolean,
    default: false
  },
  isHonoursCourse: {
    type: Boolean,
    default: false
  },
  isMinorCourse: {
    type: Boolean,
    default: false
  },
  semesterOrder: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

// Index for efficient queries
courseSchema.index({ userId: 1, semester: 1 });
courseSchema.index({ userId: 1, basketType: 1 });

export default mongoose.model('Course', courseSchema);
