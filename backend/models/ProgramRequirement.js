// backend/models/ProgramRequirement.js
import mongoose from 'mongoose';

const basketRequirementSchema = new mongoose.Schema({
  basketName: { type: String, required: true },
  minCredits: { type: Number, required: true },
  maxCredits: { type: Number, default: 999 },
  isMandatory: { type: Boolean, default: true }
});

const programRequirementSchema = new mongoose.Schema({
  programCode: { type: String, required: true, unique: true },
  programName: { type: String, required: true },
  admissionYearStart: { type: Number, required: true },
  admissionYearEnd: { type: Number, default: null },
  totalCreditsRequired: { type: Number, required: true },
  basketRequirements: [basketRequirementSchema],
  disciplineCoreCredits: { type: Number, required: true },
  disciplineElectiveCredits: { type: Number, required: true },
  honoursAdditionalCredits: { type: Number, default: 20 },
  minorAdditionalCredits: { type: Number, default: 20 },
  maxCreditsPerSemester: { type: Number, default: 28 },
  normalCreditsPerSemester: { type: Number, default: 22 },
  overloadAllowedCPI: { type: Number, default: 7.0 }
});

export default mongoose.model('ProgramRequirement', programRequirementSchema);
