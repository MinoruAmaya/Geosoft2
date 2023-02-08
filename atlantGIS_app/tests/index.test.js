const supertest = require("supertest");
const app = require("../app.js");


test('test route to area.pug', async () => {
  const response = await supertest(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});