const supertest = require("supertest");
const app = require("../app.js");


test('test route to impressum.pug', async () => {
  const response = await supertest(app).get('/impressum');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});