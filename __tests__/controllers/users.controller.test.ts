import request from 'supertest';
import { describe, it, expect } from '@jest/globals';
import httpStatus from 'http-status';
import app from '../../src/config/express.config';

describe('CONTROLLER /users', () => {
  const URI = '/api/users';
  let newUserId : number;

  const USER_FORM = {
    firstName: 'Test firstName',
    lastName: 'Test lastName',
    phone: '666666666',
    email: 'usertest@test.com',
    address: 'Calle test 5',
    country: 'Test Country',
    postalCode: '28001',
    roleId: 1,
    password: 'Test2004',
    confirmPassword: 'Test2004',
  };

  const USER_FORM_UPDATED = {
    firstName: 'firstName ',
  };

  describe('POST /users', () => {
    it('should be 201 - CREATED', async () => {
      const result = await request(app).post(URI).send(USER_FORM);
      expect(result.status).toBe(httpStatus.CREATED);
      newUserId = result.body.data.id;
    });

    it('should be 400 - BAD REQUEST', async () => {
      const result = await request(app).post(URI).send({ });
      expect(result.body.error).toHaveProperty('errors');
      expect(result.body.error.errors.length).toBeGreaterThan(0);
      expect(result.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /users/{userId}', () => {
    it('should be 200 - OK', async () => {
      const result = await request(app).get(`${URI}/${newUserId}`);
      expect(result.status).toBe(httpStatus.OK);
    });
  });

  describe('PUT /users/{userId}', () => {
    it('should be 202 - ACCEPTED', async () => {
      const result = await request(app).put(`${URI}/${newUserId}`).send(USER_FORM_UPDATED);
      expect(result.status).toBe(httpStatus.ACCEPTED);
    });
  });

  describe('DELETE /users/{userId}', () => {
    it('should be 204 - NO CONTENT', async () => {
      const result = await request(app).delete(`${URI}/${newUserId}`);
      expect(result.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});
