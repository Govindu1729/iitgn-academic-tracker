import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import assert from 'assert';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';
import { startTestDB, stopTestDB } from './setupTest.js';
import User from '../models/User.js';

dotenv.config();

let app;
let agent;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  await startTestDB();

  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/auth', authRoutes);

  agent = request.agent(app);
});

after(async () => {
  await stopTestDB();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth routes', () => {
  it('should signup a user and set refresh cookie', async () => {
    const res = await agent.post('/api/auth/signup').send({ email: 'test@example.com', password: 'password123' });
    assert.equal(res.status, 201);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.user);
    const cookies = res.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));
  });

  it('should login existing user and return tokens', async () => {
    // create user via signup
    await agent.post('/api/auth/signup').send({ email: 'a@a.com', password: 'password123' });
    const res = await agent.post('/api/auth/login').send({ email: 'a@a.com', password: 'password123' });
    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    const cookies = res.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));
  });

  it('should refresh token using refresh cookie', async () => {
    // signup to get cookie
    const signupRes = await agent.post('/api/auth/signup').send({ email: 'b@b.com', password: 'password123' });
    const cookies = signupRes.headers['set-cookie'];
    assert.ok(cookies && cookies.some(c => c.startsWith('refreshToken')));

    // use agent which preserves cookies
    const refreshRes = await agent.post('/api/auth/refresh');
    assert.equal(refreshRes.status, 200);
    assert.ok(refreshRes.body.accessToken);
    const newCookies = refreshRes.headers['set-cookie'];
    assert.ok(newCookies && newCookies.some(c => c.startsWith('refreshToken')));
  });

  it('should logout and clear cookie', async () => {
    await agent.post('/api/auth/signup').send({ email: 'c@c.com', password: 'password123' });
    const res = await agent.post('/api/auth/logout');
    assert.equal(res.status, 200);
    const cookies = res.headers['set-cookie'];
    // cookie should be cleared (contains Expires or Max-Age=0)
    assert.ok(cookies && cookies.some(c => /refreshToken=.*;(?:.*(Expires=Thu, 01 Jan 1970)|Max-Age=0)/i.test(c) || /refreshToken=;/i.test(c)));
  });
});
