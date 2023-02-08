const supertest = require("supertest");
const app = require("../app.js");


test('test route to demo.pug', async () => {
  const response = await supertest(app).get('/demo');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

test('test route to demo_ergebnisse.pug', async () => {
  const response = await supertest(app).get('/demo/ergebnisse');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});