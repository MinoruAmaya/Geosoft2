const supertest = require("supertest");
const app = require("../app.js");


// test route to satelliteimage.pug
test('test route to satelliteimage.pug', async () => {
  const response = await supertest(app).get('/satelliteimage');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});