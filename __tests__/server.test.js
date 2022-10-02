'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Testing REST API', () => {

  test('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });

  test('Create a customer', async() => {
    let responseOne = await request.post('/animal').send({
      name: 'chicken',
      age: 12,
      group: 'birds',
    });
    let responseTwo = await request.post('/animals').send({
      name: 'elephant',
      age: 1,
      group: 'mammals',
    });

    expect(responseOne.status).toEqual(200);
    expect(responseOne.body.name).toEqual('chicken');
    expect(responseOne.body.age).toEqual(12);
    expect(responseOne.body.group).toEqual('birds');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.name).toEqual('elephant');
    expect(responseTwo.body.age).toEqual(1);
    expect(responseTwo.body.group).toEqual('mammals');
  });

  test('Reads all customers', async () => {
    let response = await request.get('/animals');
    console.log('should have two records', response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toEqual('chicken');
    expect(response.body[0].age).toEqual(12);
    expect(response.body[0].pronouns).toEqual('birds');
    expect(response.body[1].name).toEqual('elephant');
    expect(response.body[1].age).toEqual(1);
    expect(response.body[1].pronouns).toEqual('mammals');

  });

  test('Reads a single animal', async () => {
    let response = await request.get('/animals/1');

    expect(response.body.name).toEqual('chicken');
    expect(response.body.age).toEqual(12);
    expect(response.body.pronouns).toEqual('birds');
  });

  test('Updates an animal', async () => {
    let response = await request.put('/animals/1').send({
      name: 'chicken',
      age: 12,
      pronouns: 'birds',
    });

    expect(response.body.name).toEqual('chicken');
    expect(response.body.age).toEqual(12);
    expect(response.body.pronouns).toEqual('birds');
  });

  test('Delete an animal', async () => {
    await request.delete('/animals/1');
    let response = await request.get('/animals');
    console.log('should have one record', response.body);

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toEqual('elephant');
    expect(response.body[0].age).toEqual(1);
    expect(response.body[0].group).toEqual('mammals');
  });
});
