const supertest = require("supertest");
const app = require("../app.js");


test('test route to satelliteimage.pug', async () => {
  const response = await supertest(app).get('/satelliteimage');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

/*
test('test route /satelliteimage/uploadSatelliteimage', async () => {
  const response = await supertest(app)
    .post('/satelliteimage/uploadSatelliteimage')
    .attach('file', './test/test.txt')
    .field('data', 'some data');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    fileName: 'test.txt',
    data: 'some data'
  });
});
*/