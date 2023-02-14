const supertest = require("supertest");
const app = require("../app.js");


// test route to demo.pug
test('test route to demo.pug', async () => {
  const response = await supertest(app).get('/demo');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

// test route to demo_ergebnisse.pug
test('test route to demo_ergebnisse.pug', async () => {
  const response = await supertest(app).get('/demo/ergebnisse');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});