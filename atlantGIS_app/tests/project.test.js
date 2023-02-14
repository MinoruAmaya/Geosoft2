const supertest = require("supertest");
const app = require("../app.js");


// test route to project.pug
test('test route to project.pug', async () => {
  const response = await supertest(app).get('/project');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});