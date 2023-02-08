const supertest = require("supertest");
const app = require("../app.js");


test('test route to trainModel.pug', async () => {
  const response = await supertest(app).get('/trainModel');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

/*
 * route muss noch getestet werden, keine ahnung wie
test('test route uploadTrainModel to aoa.pug', async () => {
  const response = await supertest(app).get('/trainModel/uploadTrainModell');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});


 * route muss noch getestet werden, keine ahnung wie
test('test route uploadUntrainModel to aoa.pug', async () => {
  const response = await supertest(app).get('/trainModel/uploadUntrainModell');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
*/