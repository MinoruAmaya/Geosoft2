const supertest = require("supertest");
const app = require("../app.js");


// test route to updateTrainData.pug
test('test route to updateTrainData.pug', async () => {
  const response = await supertest(app).get('/updateTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});