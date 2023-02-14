const supertest = require("supertest");
const app = require("../app.js");

// test route to addTrainData.pug
test('test route to addTrainData.pug', async () => {
  const response = await supertest(app).get('/addTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
