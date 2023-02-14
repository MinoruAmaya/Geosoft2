const supertest = require("supertest");
const app = require("../app.js");


// test route to trainModel.pug
test('test route to trainModel.pug', async () => {
  const response = await supertest(app).get('/trainModel');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
