
const supertest = require("supertest");
const app = require("../app.js");


test('test route to area.pug', async () => {
  const response = await supertest(app).get('/area');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});


/*
 * upload fehlt
test('test route /area/addData', async () => {
    const response = await supertest(app)
      .post('/area/addData')
      .attach('file', './test/test.txt')
      .field('data', 'some data');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      fileName: 'test.txt',
      data: 'some data'
    });
});
  */