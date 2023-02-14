const supertest = require("supertest");
const app = require("../app.js");

// test route to aoa.pug
test('test route to aoa.pug', async () => {
  const response = await supertest(app).get('/aoa');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

// test route to updateTrainData.pug
test('test route to updateTrainData.pug', async () => {
  const response = await supertest(app).get('/aoa/updateTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
