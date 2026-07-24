import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import assert from 'assert';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';
import analyticsRoutes from '../routes/analytics.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { startTestDB, stopTestDB } from './setupTest.js';

dotenv.config();

let app;
let agent;
let accessToken;
let userId;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  await startTestDB();

  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);
  app.use('/api/analytics', analyticsRoutes);

  agent = request.agent(app);

  // signup and get access token
  const signupRes = await agent.post('/api/auth/signup').send({ email: 'analytics@example.com', password: 'password123' });
  accessToken = signupRes.body.accessToken;
  userId = signupRes.body.user.id;
});

after(async () => {
  await stopTestDB();
});

afterEach(async () => {
  await Course.deleteMany({});
});

describe('Analytics routes', () => {
  it('should compute credits-status with normalized baskets', async () => {
    // Insert courses with alias basket names
    await Course.create({ userId, courseCode: 'C1', courseName: 'Core 1', credits: 4, grade: 'A', semester: 'I', academicYear: '2023-24', basketType: 'dept core', department: 'CSE' });
    await Course.create({ userId, courseCode: 'C2', courseName: 'Elective 1', credits: 3, grade: 'B', semester: 'I', academicYear: '2023-24', basketType: 'discipline-elective', department: 'CSE' });
    await Course.create({ userId, courseCode: 'C3', courseName: 'HSS 1', credits: 2, grade: 'F', semester: 'I', academicYear: '2023-24', basketType: 'hss', department: 'HSS' });

    const res = await agent.get('/api/analytics/credits-status').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(res.status, 200);
    const body = res.body;
    assert.equal(body.programCode, 'BTech_CSE');
    // find Discipline Core basket
    const discCore = body.baskets.find(b => b.basketName === 'Discipline Core');
    assert.ok(discCore);
    assert.equal(discCore.completed, 4);
    // discipline elective
    const discElect = body.baskets.find(b => b.basketName === 'Discipline Elective');
    assert.ok(discElect);
    assert.equal(discElect.completed, 3);
    // hss should not count failed course
    const hss = body.baskets.find(b => b.basketName === 'HSS');
    if (hss) assert.equal(hss.completed, 0);
  });

  it('should return GPA data', async () => {
    await Course.create({ userId, courseCode: 'G1', courseName: 'GPA1', credits: 4, grade: 'A', semester: 'I', academicYear: '2023-24', basketType: 'Institute Core' });
    await Course.create({ userId, courseCode: 'G2', courseName: 'GPA2', credits: 3, grade: 'B', semester: 'II', academicYear: '2023-25', basketType: 'Institute Core' });

    const res = await agent.get('/api/analytics/gpa').set('Authorization', `Bearer ${accessToken}`);
    assert.equal(res.status, 200);
    const body = res.body;
    assert.ok(typeof body.overallCPI === 'number');
    assert.ok(body.totalGradedCredits >= 7);
  });
});
