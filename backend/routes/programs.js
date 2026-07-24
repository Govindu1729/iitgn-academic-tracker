import express from 'express';
import { authenticate } from '../middleware/auth.js';
import logger from '../utils/logger.js';

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
  import { authenticate } from '../middleware/auth.js';
  import programRequirementsData from '../data/programRequirements.js';
  import logger from '../utils/logger.js';

  const router = express.Router();

  router.get('/requirements/:programCode', authenticate, async (req, res) => {
    try {
      const { programCode } = req.params;
      const requirements = programRequirementsData[programCode];
    
      if (!requirements) {
        return res.status(404).json({ message: 'Program requirements not found' });
      }
    
      res.json(requirements);
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  export default router;
    programName: 'B.Tech Integrated Circuit Design & Technology',
