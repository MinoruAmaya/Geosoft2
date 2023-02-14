const supertest = require("supertest");
const app = require("../app.js");


// test route to wiki.pug
test('test route to wiki.pug', async () => {
  const response = await supertest(app).get('/wiki');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});