const supertest = require("supertest");
const app = require("../app.js");


test('test route to aoa.pug', async () => {
  const response = await supertest(app).get('/aoa');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

test('test route to updateTrainData.pug', async () => {
  const response = await supertest(app).get('/aoa/updateTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});


/* 
 * test download fehlt 
test('test route /downloadData', async () => {
  const response = await supertest(app).get('/aoa/downloadData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
*/