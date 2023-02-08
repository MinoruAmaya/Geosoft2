const supertest = require("supertest");
const app = require("../app.js");


test('test route to addTrainData.pug', async () => {
  const response = await supertest(app).get('/addTrainData');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});

/* 
 * test upload fehlt 
test('test route /addTrainData/uploadTrainingData', async () => {
    const response = await supertest(app)
      .post('/addTrainData/uploadTrainingData')
      .attach('file', './test/test.txt')
      .field('data', 'some data');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      fileName: 'test.txt',
      data: 'some data'
    });
});
*/