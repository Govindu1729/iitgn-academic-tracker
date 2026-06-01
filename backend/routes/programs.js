import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const programRequirementsData = {
  BTech_CSE: {
    programName: 'B.Tech Computer Science & Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 36,
    disciplineElectiveCredits: 26,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 36, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 26, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_AI: {
    programName: 'B.Tech Artificial Intelligence',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_EE: {
    programName: 'B.Tech Electrical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_ME: {
    programName: 'B.Tech Mechanical Engineering',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_ChemE: {
    programName: 'B.Tech Chemical Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_Civil: {
    programName: 'B.Tech Civil Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_MSE: {
    programName: 'B.Tech Materials Engineering',
    totalCreditsRequired: 170,
    disciplineCoreCredits: 42,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 42, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_ICDT: {
    programName: 'B.Tech Integrated Circuit Design & Technology',
    totalCreditsRequired: 172,
    disciplineCoreCredits: 44,
    disciplineElectiveCredits: 20,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 44, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_DoubleMajor: {
    programName: 'B.Tech with Double Major',
    totalCreditsRequired: 190,
    disciplineCoreCredits: 36,
    disciplineElectiveCredits: 26,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 36, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 26, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true },
      { basketName: 'Double Major', minCredits: 20, isMandatory: true }
    ]
  },
  BTech_MTech_Dual: {
    programName: 'B.Tech-M.Tech Dual Degree',
    totalCreditsRequired: 242,
    disciplineCoreCredits: 24,
    disciplineElectiveCredits: 0,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 24, isMandatory: true },
      { basketName: 'MTech Thesis', minCredits: 32, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 16, isMandatory: true },
      { basketName: 'Project', minCredits: 4, isMandatory: true }
    ]
  },
  BTech_MSc_Dual: {
    programName: 'B.Tech-M.Sc Dual Degree',
    totalCreditsRequired: 242,
    disciplineCoreCredits: 30,
    disciplineElectiveCredits: 12,
    basketRequirements: [
      { basketName: 'Institute Core', minCredits: 73, isMandatory: true },
      { basketName: 'HSS', minCredits: 28, isMandatory: true },
      { basketName: 'Science Basket', minCredits: 8, isMandatory: true },
      { basketName: 'Mathematics Basket', minCredits: 2, isMandatory: true },
      { basketName: 'Materials Basket', minCredits: 3, isMandatory: true },
      { basketName: 'General Education', minCredits: 4, isMandatory: true },
      { basketName: 'Discipline Core', minCredits: 30, isMandatory: true },
      { basketName: 'Discipline Elective', minCredits: 12, isMandatory: true },
      { basketName: 'MSc Project', minCredits: 20, isMandatory: true },
      { basketName: 'Open Elective', minCredits: 12, isMandatory: true }
    ]
  }
};

router.get('/requirements/:programCode', authenticate, async (req, res) => {
  try {
    const { programCode } = req.params;
    const requirements = programRequirementsData[programCode];
    
    if (!requirements) {
      return res.status(404).json({ message: 'Program requirements not found' });
    }
    
    res.json(requirements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/list', authenticate, async (req, res) => {
  try {
    const programs = Object.keys(programRequirementsData).map(code => ({
      code,
      name: programRequirementsData[code].programName,
      totalCredits: programRequirementsData[code].totalCreditsRequired
    }));
    res.json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
