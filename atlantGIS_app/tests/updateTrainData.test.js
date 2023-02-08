const supertest = require("supertest");
const app = require("../app.js");


test('test route to updateTrainData.pug', async () => {
  const response = await supertest(app).get('/updateTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

/*
 * muss noch getestet werden, keine Ahnung wie
 *
test('test route uploadTrainingData', async () => {
  const response = await supertest(app)
    .post('/updateTrainData/uploadTrainingData')
    .attach('file', './test/test.txt')
    .field('data', 'some data');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    fileName: 'test.txt',
    data: 'some data'
  });
});

* muss noch getestet werden, keine Ahnung wie
 *
test('test route uploadNewTrainingData', async () => {
  const response = await supertest(app)
    .post('/updateTrainData/uploadNewTrainingData')
    .attach('file', './test/test.txt')
    .field('data', 'some data');
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    fileName: 'test.txt',
    data: 'some data'
  });
});
*/