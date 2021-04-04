import request from 'supertest';
import {
  describe, it, expect, beforeAll,
} from '@jest/globals';
import httpStatus from 'http-status';
import app from '../../src/config/express.config';

describe('CONTROLLER /company', () => {
  const URI = '/api/users';
  let newUserId : number;

  const USER_FORM = {
    firstName: 'Test firstName',
    lastName: 'Test lastName',
    phone: '+34 666 666 666',
    email: 'usertest@test.com',
    address: 'c/ test',
    country: 'Test Country',
    postalCode: '28001',
    roleId: 1,
    password: 'test password',
  };

  describe('POST /company/{companyId}/groups', () => {
    it('should be 201 - CREATED', async () => {
      const result = await request(app).post(URI).send(USER_FORM);
      expect(result.status).toBe(httpStatus.CREATED);
      // newUserId = result.body.data.id;
    });

    // it('should be 400 - BAD REQUEST', async () => {
    //   const result = await request(app).post(URI).send({ password: 'nepe' });
    //   expect(result.body).toHaveProperty('errors');
    //   expect(result.body.errors.length).toBeGreaterThan(0);
    //   expect(result.status).toBe(httpStatus.BAD_REQUEST);
    // });
  });
});
