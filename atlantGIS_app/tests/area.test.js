
const supertest = require("supertest");
const app = require("../app.js");


// test route to area.pug
test('test route to area.pug', async () => {
  const response = await supertest(app).get('/area');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});